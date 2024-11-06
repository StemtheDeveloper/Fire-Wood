// src/components/Admin.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import CardForm from '../components/CardForm';
import axios from 'axios';
import '../styles/Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('create'); // 'create' or 'manage'

  useEffect(() => {
    if (user?.email === 'stiaan44@gmail.com') {
      fetchCards();
    }
  }, [user]);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cards');
      setCards(response.data);
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await axios.delete(`http://localhost:5000/api/cards/${cardId}`);
        setCards(cards.filter(card => card._id !== cardId));
      } catch (err) {
        console.error('Error deleting card:', err);
        setError('Failed to delete card');
      }
    }
  };

  // Only render if user is admin
  if (user?.email !== 'stiaan44@gmail.com') {
    return (
      <div className="admin-denied">
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-nav">
          <button 
            className={`nav-button ${activeView === 'create' ? 'active' : ''}`}
            onClick={() => setActiveView('create')}
          >
            Create Card
          </button>
          <button 
            className={`nav-button ${activeView === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveView('manage')}
          >
            Manage Cards
          </button>
        </div>
      </div>

      {activeView === 'create' ? (
        <CardForm onCardCreated={fetchCards} />
      ) : (
        <div className="card-management">
          <h2>Manage Cards</h2>
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading">Loading cards...</div>
          ) : (
            <div className="cards-grid">
              {cards.map(card => (
                <div key={card._id} className="card-item">
                  <img 
                    src={card.imageUrl} 
                    alt={card.cardName} 
                    className="card-thumbnail"
                  />
                  <div className="card-details">
                    <h3>{card.cardName}</h3>
                    <p>Rarity: {card.rarity}</p>
                    <div className="card-stats">
                      <span>ATK: {card.attack}</span>
                      <span>DEF: {card.defense}</span>
                      <span>HP: {card.health}</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button 
                      onClick={() => handleDeleteCard(card._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;