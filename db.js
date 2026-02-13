const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
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
