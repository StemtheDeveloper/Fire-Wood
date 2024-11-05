import { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import ButtonIMG from "../assets/other/Button.svg";
import FancyHR from "../assets/other/Fancy HR white.svg";
import logo from "../assets/logos/Fire Wood Logo.svg";

function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        ☰
      </button>

      <img src={logo} className="App-logo" alt="logo" />
      <div className="navCont">
      <div className="nav-main">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/play" className="nav-link">
          Play
        </Link>
        <Link to="/deck" className="nav-link">
          Deck
        </Link>
        <Link to="/shop" className="nav-link">
          Shop
        </Link>
        <Link to="/stats" className="nav-link">
          Stats
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </div>
      <div className="nav-auth">
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
        <Link to="/admin" className="nav-link">
          Admin
        </Link>
      </div>
      </div>
      <img id="fhr" src={FancyHR} alt="Fancy HR" className="fancy-hr" />
    </nav>
  );
}

export default Nav;
