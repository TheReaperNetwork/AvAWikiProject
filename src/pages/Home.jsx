import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { characters } from "../data/characters";

function Home() {
  const tdl = new URL("../assets/Stickfigurered.webp", import.meta.url).href;
  const tco = new URL("../assets/Stickfigureheadbluehd.webp", import.meta.url).href;
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(false);
  return (
    <div className="page home-page">
      <div className="container">
        <div className="home-hero">
          <h1 className="title">
            <img src={tdl} alt="tdl" className="title-icon large tdl-large left" />
            Animation <span className="vs-accent">VS</span> Wiki
            <img src={tco} alt="tco" className="title-icon large right tco-large" />
          </h1>

          <p className="subtitle">A modern wiki of the Animation vs universe</p>

          <div className="hero-actions">
            <button
              className="hero-cta"
              onClick={() => {
                const idx = Math.floor(Math.random() * characters.length);
                navigate(`/${characters[idx].slug}`);
              }}
              aria-label="Surprise Article"
            >
              Surprise Article 🎲
            </button>

            <Link to="/trivia" className="hero-cta hero-cta-secondary" aria-label="Go to trivia page">
              Play Trivia ✨
            </Link>
          </div>
        </div>

        <div className="cards">
          {characters.map((c) => (
            <Link key={c.id} to={`/${c.slug}`} className="card-link">
              <article className="card" data-accent={c.slug}>
                <h2 className="card-title">{c.name}</h2>
                <p className="card-desc">{c.description.slice(0, 100)}...</p>
              </article>
            </Link>
          ))}
        </div>

        <div className="video-section">
          <h2 className="video-title">Newest Video in the Series - Animation VS Animator 13 - The Machine</h2>
          <div className={`video-frame ${zoom ? "zoomed" : ""}`} onClick={() => setZoom(!zoom)}>
            <iframe
              src={`https://www.youtube.com/embed/l6WeJ9JqDfU?si=KQVjVfjt35--B10W`}
              title="Animation VS Animator 13 - The Machine"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;