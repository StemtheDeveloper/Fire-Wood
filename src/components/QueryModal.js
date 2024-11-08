import React, { useState, useEffect } from 'react';
import '../styles/QueryModal.css';

const QueryModal = ({ onClose, onQuery, queryResults }) => {
  const [collection, setCollection] = useState('cards');
  const [key, setKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuery(collection, key);
  };

  useEffect(() => {
    if (queryResults.length > 0) {
      setKey('');
    }
  }, [queryResults]);

  return (
    <div className="modal-overlay">
      <div className="query-modal">
        <div className="modal-header">
          <h2>Query Data</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="query-form">
          <div className="form-section">
            <label htmlFor="collection">Collection</label>
            <select
              id="collection"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            >
              <option value="cards">Cards</option>
              <option value="users">Users</option>
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="key">Key</label>
            <input
              type="text"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key to query"
              required
            />
          </div>
          <button type="submit" className="query-button">Query</button>
        </form>
        {queryResults.length > 0 && (
          <div className="query-results">
            <h3>Query Results</h3>
            <textarea
              readOnly
              value={JSON.stringify(queryResults, null, 2)}
              className="query-results-textarea"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryModal;
