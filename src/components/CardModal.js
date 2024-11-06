import React from 'react';
import '../styles/CardModal.css';

const CardModal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={card.imageUrl} alt={card.cardName} className="modal-image" />
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default CardModal;
