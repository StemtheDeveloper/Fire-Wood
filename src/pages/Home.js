import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Import some featured cards
import AlexanderCard from '../assets/cards/Alexander the Great.png';
import JoanCard from '../assets/cards/Joan of Arc.png';
import WilliamCard from '../assets/cards/William Marshal.png';
import MusashiCard from '../assets/cards/Miyamoto Musashi.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Fire Wood</h1>
          <p className="hero-subtitle">Enter the Medieval Battle Arena</p>
          <Link to="/play" className="cta-button">Play Now</Link>
        </div>
        <div className="featured-cards">
          <img src={JoanCard} alt="Joan of Arc Card" className="featured-card left-card" />
          <img src={AlexanderCard} alt="Alexander the Great Card" className="featured-card center-card" />
          <img src={WilliamCard} alt="William Marshal Card" className="featured-card right-card" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Game Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Strategic Battles</h3>
            <p>Deploy your warriors wisely on the battlefield and outmaneuver your opponents</p>
          </div>
          <div className="feature">
            <h3>Historic Warriors</h3>
            <p>Command legendary fighters from different eras and cultures</p>
          </div>
          <div className="feature">
            <h3>Build Your Deck</h3>
            <p>Collect cards and create powerful combinations</p>
          </div>
          <div className="feature">
            <h3>Special Abilities</h3>
            <p>Master unique powers and tactical advantages</p>
          </div>
        </div>
      </section>

      {/* Latest Cards Section */}
      <section className="latest-cards-section">
        <h2>Featured Warriors</h2>
        <div className="cards-showcase">
          <div className="card-display">
            <img src={MusashiCard} alt="Miyamoto Musashi" />
            <div className="card-info">
              <h3>Miyamoto Musashi</h3>
              <p>Legendary Japanese Swordsman</p>
            </div>
          </div>
          <div className="card-display">
            <img src={JoanCard} alt="Joan of Arc" />
            <div className="card-info">
              <h3>Joan of Arc</h3>
              <p>Divine Warrior of France</p>
            </div>
          </div>
          <div className="card-display">
            <img src={AlexanderCard} alt="Alexander the Great" />
            <div className="card-info">
              <h3>Alexander the Great</h3>
              <p>Legendary Conqueror</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready for Battle?</h2>
        <p>Join thousands of players in epic medieval combat</p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-button">Sign Up</Link>
          <Link to="/cards" className="secondary-button">View All Cards</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;