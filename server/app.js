const express = require('express');
const app = express();
const cardRoutes = require('./routes/cardRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

app.use(express.json());

// Routes
app.use('/api', cardRoutes);
app.use('/api/users', userRoutes);
app.use('/api', gameRoutes);

module.exports = app;
