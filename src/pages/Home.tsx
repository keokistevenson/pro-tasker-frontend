import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-panel">
        <p className="eyebrow">Pro-Tasker</p>
        <h1>Manage projects and tasks with clarity.</h1>
        <p>
          Create projects, organize tasks, track progress, and keep your work
          moving without clutter.
        </p>

        <div className="hero-actions">
          <Link className="button primary" to="/register">
            Get Started
          </Link>
          <Link className="button secondary" to="/login">
            Log In
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;