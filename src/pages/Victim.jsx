import { characters } from "../data/characters";
import { Link } from "react-router-dom";

function Victim() {
  const victim = characters.find((c) => c.slug === "victim");

  if (!victim) {
    return (
      <div className="page container">
        <p className="muted">Victim not found.</p>
        <Link to="/" className="link">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page victim-page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Home</Link>

        <h1 className="title">{victim.name}</h1>

        <section className="detail">
          <h3 className="detail-heading">Description</h3>
          <p className="detail-text">{victim.description}</p>
        </section>

        <section className="detail">
          <h3 className="detail-heading">Appearance</h3>
          <p className="detail-text">{victim.appearance}</p>
        </section>

        <section className="detail">
          <h3 className="detail-heading">Role</h3>
          <p className="detail-text">{victim.role}</p>
        </section>
      </div>
    </div>
  );
}

export default Victim;