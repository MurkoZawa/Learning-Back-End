const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://mongo:27017';
const dbName = 'learnbackend';
let db;

async function connectDB() {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
    return db;
}

function getDB() {
    if (!db) throw new Error('Database not connected!');
    return db;
}

module.exports = { connectDB, getDB };
