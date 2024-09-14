const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = 'myDatabase'; // Database name
let db, collection;

async function connectDB() {
  await client.connect();
  console.log('Connected successfully to MongoDB Atlas');
  db = client.db(dbName);
  collection = db.collection('users');
}

// Export the connection function and database/collection references
module.exports = {
  connectDB,
  getDB: () => db,
  getCollection: () => collection
};
