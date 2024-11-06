import React, { useState } from 'react';
import { storage, auth } from '../config/firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import '../styles/CardForm.css';

const CardForm = ({ onCardCreated }) => {
  const [cardData, setCardData] = useState({
    cardName: '',
    rarity: 1,
    defense: 10,
    attack: 15,
    speed: 1,
    energy: 2,
    health: 100,
    accuracy: 100,
    specialAbility: {
      description: '',
      type: 'Damage',
      trigger: 'Attack',
      proximityCondition: 1,
      duration: '',
      effectValue: ''
    }
  });
  const [cardImage, setCardImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Only allow admin access
  if (auth.currentUser?.email !== 'stiaan44@gmail.com') {
    return <div className="admin-error">Access Denied</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('specialAbility.')) {
      const field = name.split('.')[1];
      setCardData(prev => ({
        ...prev,
        specialAbility: {
          ...prev.specialAbility,
          [field]: value
        }
      }));
    } else {
      setCardData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setCardImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let imageUrl = '';
      if (cardImage) {
        const storageRef = ref(storage, `cards/${Date.now()}_${cardImage.name}`);
        const uploadResult = await uploadBytes(storageRef, cardImage);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      if (!imageUrl) {
        throw new Error('Image upload failed');
      }

      const token = await auth.currentUser.getIdToken();
      const cardPayload = {
        ...cardData,
        imageUrl,
        ownerId: auth.currentUser.uid,
        specialAbility: {
          ...cardData.specialAbility,
          proximityCondition: parseInt(cardData.specialAbility.proximityCondition) || 1
        }
      };

      const response = await axios.post('http://localhost:5000/api/cards', cardPayload, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccess('Card created successfully!');
      if (onCardCreated) onCardCreated();
      
      // Reset form
      setCardData({
        cardName: '',
        rarity: 1,
        defense: 10,
        attack: 15,
        speed: 1,
        energy: 2,
        health: 100,
        accuracy: 100,
        specialAbility: {
          description: '',
          type: 'Damage',
          trigger: 'Attack',
          proximityCondition: 1,
          duration: '',
          effectValue: ''
        }
      });
      setCardImage(null);
    } catch (err) {
      console.error('Error creating card:', err);
      setError(err.response?.data?.message || 'Failed to create card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-form-container">
      <form onSubmit={handleSubmit} className="card-form">
        <h2>Create New Card</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label htmlFor="cardName">Card Name</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={cardData.cardName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rarity">Rarity (1-10000)</label>
            <input
              type="number"
              id="rarity"
              name="rarity"
              min="1"
              max="10000"
              value={cardData.rarity}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="attack">Attack</label>
            <input
              type="number"
              id="attack"
              name="attack"
              min="0"
              max="100"
              value={cardData.attack}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="defense">Defense</label>
            <input
              type="number"
              id="defense"
              name="defense"
              min="0"
              max="100"
              value={cardData.defense}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="speed">Speed</label>
            <input
              type="number"
              id="speed"
              name="speed"
              min="1"
              max="10"
              value={cardData.speed}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="energy">Energy</label>
            <input
              type="number"
              id="energy"
              name="energy"
              min="0"
              max="10"
              value={cardData.energy}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="health">Health</label>
            <input
              type="number"
              id="health"
              name="health"
              min="0"
              max="500"
              value={cardData.health}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="accuracy">Accuracy</label>
            <input
              type="number"
              id="accuracy"
              name="accuracy"
              min="0"
              max="100"
              value={cardData.accuracy}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="specialAbility.description">Special Ability Description</label>
          <textarea
            id="specialAbility.description"
            name="specialAbility.description"
            value={cardData.specialAbility.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="specialAbility.type">Ability Type</label>
            <select
              id="specialAbility.type"
              name="specialAbility.type"
              value={cardData.specialAbility.type}
              onChange={handleInputChange}
              required
            >
              <option value="Damage">Damage</option>
              <option value="Heal">Heal</option>
              <option value="Shield">Shield</option>
              <option value="Convert">Convert</option>
              <option value="Poison">Poison</option>
              <option value="Draw">Draw</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="specialAbility.trigger">Trigger</label>
            <select
              id="specialAbility.trigger"
              name="specialAbility.trigger"
              value={cardData.specialAbility.trigger}
              onChange={handleInputChange}
              required
            >
              <option value="Attack">Attack</option>
              <option value="Move">Move</option>
              <option value="Proximity">Proximity</option>
              <option value="Turn start">Turn Start</option>
              <option value="Draw">Draw</option>
              <option value="Enemy played a card">Enemy Played Card</option>
              <option value="You played a card">You Played Card</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cardImage">Card Image</label>
          <input
            type="file"
            id="cardImage"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {cardImage && (
            <p className="file-name">Selected: {cardImage.name}</p>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-button" 
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Card'}
        </button>
      </form>
    </div>
  );
};

export default CardForm;