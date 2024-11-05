import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/Admin.css';

const Admin = () => {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    name: '',
    type: '',
    cost: '',
    power: '',
    effect: '',
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editing, setEditing] = useState(null);
  const storage = getStorage();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const cardsCollection = collection(db, 'cards');
      const cardsSnapshot = await getDocs(cardsCollection);
      const cardsList = cardsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCards(cardsList);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = newCard.imageUrl;

      if (selectedFile) {
        const storageRef = ref(storage, `cards/${selectedFile.name}-${Date.now()}`);
        const uploadResult = await uploadBytes(storageRef, selectedFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      const cardData = {
        ...newCard,
        imageUrl: imageUrl
      };

      if (editing) {
        await updateDoc(doc(db, 'cards', editing), cardData);
        setEditing(null);
      } else {
        await addDoc(collection(db, 'cards'), cardData);
      }

      setNewCard({ name: '', type: '', cost: '', power: '', effect: '', imageUrl: '' });
      setSelectedFile(null);
      fetchCards();
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'cards', id));
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Card Management</h1>
      
      <form onSubmit={handleSubmit} className="card-form">
        <input
          type="text"
          placeholder="Card Name"
          value={newCard.name}
          onChange={(e) => setNewCard({...newCard, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Card Type"
          value={newCard.type}
          onChange={(e) => setNewCard({...newCard, type: e.target.value})}
        />
        <input
          type="number"
          placeholder="Cost"
          value={newCard.cost}
          onChange={(e) => setNewCard({...newCard, cost: e.target.value})}
        />
        <input
          type="number"
          placeholder="Power"
          value={newCard.power}
          onChange={(e) => setNewCard({...newCard, power: e.target.value})}
        />
        <textarea
          placeholder="Card Effect"
          value={newCard.effect}
          onChange={(e) => setNewCard({...newCard, effect: e.target.value})}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">{editing ? 'Update Card' : 'Add Card'}</button>
      </form>

      <div className="cards-list">
        <h2>Existing Cards</h2>
        {cards.map(card => (
          <div key={card.id} className="card-item">
            <h3>{card.name}</h3>
            <p>Type: {card.type}</p>
            <p>Cost: {card.cost}</p>
            <p>Power: {card.power}</p>
            <p>Effect: {card.effect}</p>
            {card.imageUrl && <img src={card.imageUrl} alt={card.name} />}
            <div className="card-actions">
              <button onClick={() => {
                setEditing(card.id);
                setNewCard(card);
              }}>Edit</button>
              <button onClick={() => handleDelete(card.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
