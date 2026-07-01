import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { characters } from "../data/characters";

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

function scoreMatch(q, c) {
  if (!q) return 0;
  const ql = q.toLowerCase();
  const name = c.name.toLowerCase();
  const desc = (c.description || "").toLowerCase();

  if (name === ql) return 1000;
  if (name.includes(ql)) return 900;
  if (desc.includes(ql)) return 700;

  const d = levenshtein(ql, name);
  const maxLen = Math.max(1, name.length);
  const norm = 1 - d / maxLen;
  return Math.round(norm * 600);
}

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const activeSlug = location.pathname === "/" ? "" : location.pathname.replace(/^\/+/, "");

  const suggestions = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return characters
      .map((c) => ({ c, score: scoreMatch(q, c) }))
      .filter((s) => s.score > 50)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((s) => s.c);
  }, [query]);

  function onSubmit(e) {
    e && e.preventDefault();
    if (!query) return;
    if (suggestions.length > 0) {
      navigate(`/${suggestions[0].slug}`);
      setQuery("");
    }
  }

  return (
    <aside className={"sidebar" + (open ? " sidebar-open" : "") }>
      <div className="side-top">
        <button className="side-toggle" onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
          {open ? "←" : "☰"}
        </button>
        {open && (
          <>
            <div className="side-title" role="button" onClick={() => navigate('/') }>
              Animation Wiki
            </div>
          </>
        )}
      </div>

      {open && (
        <div className="side-body">
          <form className="side-search" onSubmit={onSubmit} onBlur={() => setTimeout(() => {}, 150)}>
            <input
              className="search-input"
              placeholder="Search characters..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {}}
            />
          </form>

          <ul className="side-links">
            {characters.map((c) => (
              <li
                key={c.slug}
                onClick={() => navigate(`/${c.slug}`)}
                className={`side-link${activeSlug === c.slug ? " active" : ""}`}
              >
                {c.name}
              </li>
            ))}
          </ul>

          {suggestions.length > 0 && (
            <div className="side-suggestions">
              <div className="suggestions-label">Suggestions</div>
              <ul>
                {suggestions.map((s) => (
                  <li key={s.slug} className="suggestion" onMouseDown={() => navigate(`/${s.slug}`)}>
                    <div className="s-name">{s.name}</div>
                    <div className="s-sub">{String(s.description).slice(0,60)}{s.description.length>60?"...":""}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
