const express = require('express');
const router = express.Router();
const { getDB } = require('./db');
const ObjectId = require('mongodb').ObjectId;

// --- REGISTRAZIONE ---
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const db = getDB();

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email già registrata' });

        await db.collection('users').insertOne({ username, email, password });
        res.json({ message: 'Utente registrato con successo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// --- LOGIN ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = getDB();
        const user = await db.collection('users').findOne({ username, password });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- CREA TASK ---
router.post('/tasks', async (req, res) => {
    try {
        const db = getDB();
        const task = req.body;
        await db.collection('tasks').insertOne(task);
        res.json({ message: 'Task creato con successo', task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- GET TUTTI I TASK ---
router.get('/tasks', async (req, res) => {
    try {
        const db = getDB();
        const tasks = await db.collection('tasks').find().toArray();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- PUT TASK ---
router.put('/tasks/:id', async (req, res) => {
    try {
        const db = getDB();
        const id = req.params.id;
        const update = req.body;
        await db.collection('tasks').updateOne({ _id: new ObjectId(id) }, { $set: update });
        res.json({ message: 'Task aggiornato' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- DELETE TASK ---
router.delete('/tasks/:id', async (req, res) => {
    try {
        const db = getDB();
        const id = req.params.id;
        await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
        res.json({ message: 'Task eliminato' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
