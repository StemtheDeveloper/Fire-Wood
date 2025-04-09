import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Deck.css";

const CardPlaceholder = () => (
  <div className="card-wrapper">
    <div className="card-placeholder">
      <div className="card-placeholder-image" />
    </div>
  </div>
);

const Deck = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/cards");
      setCards(response.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
      setError("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseEnlarged = (e) => {
    if (e.target.classList.contains("enlarged-view")) {
      setSelectedCard(null);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="deck-container">
  //       <div className="placeholder-grid">
  //         {[...Array(12)].map((_, index) => (
  //           <CardPlaceholder key={index} />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  if (error) return <div className="deck-error">{error}</div>;

  return (
    <div className="deck-container">
      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card._id}
            className="card-wrapper"
            onClick={() => handleCardClick(card)}
          >
            <img
              src={card.imageUrl}
              alt={card.cardName}
              className="card-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="enlarged-view" onClick={handleCloseEnlarged}>
          <div className="enlarged-card">
            <img
              src={selectedCard.imageUrl}
              alt={selectedCard.cardName}
              className="enlarged-image"
            />
            <div className="card-details">
              <h2>{selectedCard.cardName}</h2>
              <div className="stats">
                <p>Attack: {selectedCard.attack}</p>
                <p>Defense: {selectedCard.defense}</p>
                <p>Health: {selectedCard.health}</p>
                <p>Speed: {selectedCard.speed}</p>
                <p>Energy: {selectedCard.energy}</p>
                <p>Accuracy: {selectedCard.accuracy}</p>
              </div>
              <div className="ability">
                <h3>Special Ability</h3>
                <p>{selectedCard.specialAbility.description}</p>
                <p>Type: {selectedCard.specialAbility.type}</p>
                <p>Trigger: {selectedCard.specialAbility.trigger}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deck;
