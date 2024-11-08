const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb+srv://stiaan44:712AStemD_B@cluster0.raiiauy.mongodb.net/carddata?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function exportQueryResults() {
  try {
    await client.connect();
    const database = client.db('carddata');
    const collection = database.collection('cards');

    const query = {};
    const projection = { cardName: 1 };
    const cursor = collection.find(query, { projection });

    const results = [];
    await cursor.forEach(doc => results.push(doc));

    fs.writeFileSync('queryResults.txt', JSON.stringify(results, null, 2));
    console.log('Query results have been written to queryResults.txt');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

exportQueryResults();
