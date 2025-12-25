import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          Job<span>Sutra</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
