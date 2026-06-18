import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  const appearance = (c.appearance || "").toLowerCase();
  const role = (c.role || "").toLowerCase();

  if (name === ql) return 1000;
  if (name.includes(ql)) return 900;
  if (desc.includes(ql) || appearance.includes(ql) || role.includes(ql)) return 700;

  const d = levenshtein(ql, name);
  const maxLen = Math.max(1, name.length);
  const norm = 1 - d / maxLen; // closer to 1 is better
  return Math.round(norm * 600);
}

export default function NavBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      setOpen(false);
    }
  }

  return (
    <nav className="nav-bar">
      <div className="nav-inner container">
        <div className="nav-brand">Animation Wiki</div>

        <form className="search-form" onSubmit={onSubmit} onBlur={() => setTimeout(() => setOpen(false), 150)}>
          <input
            aria-label="Search articles"
            className="search-input"
            placeholder="Search characters or text..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />

          {open && suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s) => (
                <li key={s.slug} className="suggestion" onMouseDown={() => {
                  navigate(`/${s.slug}`);
                  setQuery("");
                  setOpen(false);
                }}>
                  <div className="s-name">{s.name}</div>
                  <div className="s-sub">{s.description.slice(0, 60)}{s.description.length>60?"...":""}</div>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </nav>
  );
}
