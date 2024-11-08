import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://stiaan44:712AStemD_B@cluster0.raiiauy.mongodb.net/carddata?retryWrites=true&w=majority';
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/query', async (req, res) => {
  const { collection, key } = req.body;
  try {
    await client.connect();
    const database = client.db('carddata');
    const col = database.collection(collection);

    const query = {};
    const projection = { [key]: 1 };
    const cursor = col.find(query, { projection });

    const results = [];
    await cursor.forEach(doc => results.push(doc));

    res.json(results);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Failed to query data');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

