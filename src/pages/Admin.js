// src/components/Admin.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import CardForm from '../components/CardForm';
import axios from 'axios';
import '../styles/Admin.css';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebaseConfig.js';

const Admin = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('create'); // 'create' or 'manage'
  const [editingCard, setEditingCard] = useState(null);

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

  const handleEditCard = async (cardId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/cards/${cardId}`, updatedData);
      setCards(cards.map(card => card._id === cardId ? response.data : card));
      setEditingCard(null);
    } catch (err) {
      console.error('Error updating card:', err);
      setError('Failed to update card');
    }
  };

  const EditCardModal = ({ card, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      ...card,
      specialAbility: {
        ...card.specialAbility
      }
    });
    const [previewImage, setPreviewImage] = useState(card.imageUrl);
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setUploading(true);
        let updatedData = { ...formData };
  
        if (imageFile) {
          // Delete old image from Firebase
          if (card.imageUrl) {
            const oldImageRef = ref(storage, card.imageUrl);
            try {
              await deleteObject(oldImageRef);
            } catch (error) {
              console.error('Error deleting old image:', error);
            }
          }
  
          // Upload new image to Firebase
          const imageRef = ref(storage, `cards/${Date.now()}_${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          const newImageUrl = await getDownloadURL(imageRef);
          updatedData.imageUrl = newImageUrl;
        }
  
        onSave(card._id, updatedData);
      } catch (error) {
        console.error('Error updating card:', error);
      } finally {
        setUploading(false);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      const numericFields = ['attack', 'defense', 'health', 'speed', 'energy', 'accuracy', 'rarity'];
      
      setFormData(prev => ({
        ...prev,
        [name]: numericFields.includes(name) ? parseInt(value) : value
      }));
    };
  
    const handleSpecialAbilityChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        specialAbility: {
          ...prev.specialAbility,
          [name]: value
        }
      }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    };
  
    return (
      <div className="modal-overlay">
        <div className="edit-modal">
          <div className="modal-header">
            <h2>Edit Card</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          <form onSubmit={handleSubmit} className="edit-form">
            {/* Image Section */}
            {previewImage && (
              <img src={previewImage} alt="Preview" className="preview-image" />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
  
            {/* Basic Info Section */}
            <div className="form-section">
              <h3>Basic Information</h3>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="Card Name"
                required
              />
              <label for="rarity"><h3>Rarity</h3></label>
              <input name='rarity' type='number' value={formData.rarity}/>
            </div>
  
            {/* Stats Section */}
            <div className="form-section">
              <h3>Stats</h3>
              <div className="stats-grid">
                <label for="attack" >Attack</label>
                <input
                  type="number"
                  name="attack"
                  value={formData.attack}
                  onChange={handleChange}
                  placeholder="Attack"
                  required
                  min="0"
                />
                <label for="defense">Defense</label>
                <input
                  type="number"
                  name="defense"
                  value={formData.defense}
                  onChange={handleChange}
                  placeholder="Defense"
                  required
                  min="0"
                />
                <label for="health">Health</label>
                <input
                  type="number"
                  name="health"
                  value={formData.health}
                  onChange={handleChange}
                  placeholder="Health"
                  required
                  min="0"
                />
                <label for="speed">Speed</label>
                <input
                  type="number"
                  name="speed"
                  value={formData.speed}
                  onChange={handleChange}
                  placeholder="Speed"
                  required
                  min="0"
                />
                <label for="energy">Energy</label>
                <input
                  type="number"
                  name="energy"
                  value={formData.energy}
                  onChange={handleChange}
                  placeholder="Energy"
                  required
                  min="0"
                />
                <label for="accuracy">Accuracy</label>
                <input
                  type="number"
                  name="accuracy"
                  value={formData.accuracy}
                  onChange={handleChange}
                  placeholder="Accuracy"
                  required
                  min="0"
                />
              </div>
            </div>
  
            {/* Special Ability Section */}
            <div className="form-section">
              <h3>Special Ability</h3>
              <h3>Description</h3>
              <input
                type="textarea"
                name="description"
                value={formData.specialAbility.description}
                onChange={handleSpecialAbilityChange}
                placeholder="Ability Description"
              />

              <h4>Type</h4>
              <select 
                name="type"
                value={formData.specialAbility.type}
                onChange={handleSpecialAbilityChange}
              >
                <option value="">Select Type</option>
                <option value="Damage">Damage</option>
                <option value="Heal">Heal</option>
                <option value="Shield">Shield</option>
                <option value="Convert">Convert</option>
                <option value="Poison">Poison</option>
                <option value="Draw">Draw</option>
              </select>

              <h4>Trigger</h4>
              <select 
                name="trigger"
                value={formData.specialAbility.trigger}
                onChange={handleSpecialAbilityChange}
              >
                <option value="">Select Trigger</option>
                <option value="Attack">Attack</option>
                <option value="Move">Move</option>
                <option value="Proximity">Proximity</option>
                <option value="Turn start">Turn start</option>
                <option value="Draw">Draw</option>
                <option value="Enemy played a card">Enemy played a card</option>
                <option value="You played a card">You played a card</option>
              </select>
              <input
                type="number"
                name="proximityCondition"
                value={formData.specialAbility.proximityCondition}
                onChange={handleSpecialAbilityChange}
                placeholder="Proximity Condition"
                min="0"
              />
              <input
                type="text"
                name="duration"
                value={formData.specialAbility.duration}
                onChange={handleSpecialAbilityChange}
                placeholder="Duration"
              />
              <input
                type="text"
                name="effectValue"
                value={formData.specialAbility.effectValue}
                onChange={handleSpecialAbilityChange}
                placeholder="Effect Value"
              />
              
            </div>
  
            <button type="submit" className="save-button" disabled={uploading}>
              {uploading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    );
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
                      onClick={() => setEditingCard(card)}
                      className="edit-button"
                    >
                      Edit
                    </button>
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
      {editingCard && (
        <EditCardModal
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onSave={handleEditCard}
        />
      )}
    </div>
  );
};

export default Admin;