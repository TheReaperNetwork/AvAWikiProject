import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { characters } from "../data/characters";

export default function CharacterPage() {
  const { slug } = useParams();
  const character = characters.find((c) => c.slug === slug);
  // resolve Victim image asset (works in Vite dev and build)
  const vhImg = slug === "victim" ? new URL("../assets/vh.webp", import.meta.url).href : null;

  if (!character) {
    return (
      <div className="page container">
        <p className="muted">Character not found.</p>
        <Link to="/" className="link">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page character-page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Home</Link>

        <h1 className="title">{character.name}</h1>
        {character.type && <p className="muted">{character.type}</p>}

        <section className="detail">
          <h3 className="detail-heading">Description</h3>
          {(() => {
            const paras = String(character.description || "").split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
            const [expanded, setExpanded] = useState(false);

            return (
              <div>
                {paras.slice(0, expanded ? paras.length : 1).map((p, i) => (
                  <p key={i} className="detail-text">{p}</p>
                ))}

                {paras.length > 1 && (
                  <div style={{ marginTop: 8 }}>
                    <button className="read-more-btn" onClick={() => setExpanded(!expanded)}>
                      {expanded ? "Show less" : "Read more"}
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </section>

        <section className="detail">
          <h3 className="detail-heading">Appearance</h3>
          {vhImg ? (
            <div className="appearance-with-image">
              <img src={vhImg} alt={`${character.name} visual`} className="char-image" />
              <p className="detail-text">{character.appearance}</p>
            </div>
          ) : (
            <p className="detail-text">{character.appearance}</p>
          )}
        </section>

        <section className="detail">
          <h3 className="detail-heading">Role</h3>
          <p className="detail-text">{character.role}</p>
        </section>

        {character.lore && (
          <section className="detail">
            <h3 className="detail-heading">Lore</h3>
            {character.lore.split(/\n\s*\n/).map((para, idx) => (
              <p key={idx} className="detail-text">{para.trim()}</p>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}