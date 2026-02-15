const express = require('express');
const router = express.Router();
const { getDB } = require('./db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');

// ===== REGISTER =====
router.post('/api/register', async (req, res) => {
    try {
        const db = getDB();
        const { username, email, password } = req.body;
        const existing = await db.collection('users').findOne({ username });
        if (existing) return res.status(400).json({ success: false, message: "Username già esistente" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('users').insertOne({ username, email, password: hashedPassword });

        res.status(201).json({ success: true, message: "Utente registrato con successo" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ===== LOGIN =====
router.post('/api/login', async (req, res) => {
    try {
        const db = getDB();
        const { username, password } = req.body;
        const user = await db.collection('users').findOne({ username });
        if (!user) return res.status(400).json({ success: false, message: "Credenziali non valide" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Credenziali non valide" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ success: true, message: "Login effettuato con successo", token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ===== TASKS =====
router.get('/api/tasks', authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const tasks = await db.collection('tasks')
            .find({ user: new ObjectId(req.user.userId) })
            .toArray();
        res.json(tasks);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/api/tasks', authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const { name, description } = req.body;
        await db.collection('tasks').insertOne({
            name,
            description,
            user: new ObjectId(req.user.userId),
            createdAt: new Date()
        });
        res.status(201).json({ success: true, message: "Task creata" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// ===== REVIEWS =====
router.get('/api/reviews', authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const reviews = await db.collection('reviews')
            .find({ user: new ObjectId(req.user.userId) })
            .toArray();
        res.json(reviews);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/api/reviews', authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const { name, text } = req.body;
        await db.collection('reviews').insertOne({
            name,
            text,
            user: new ObjectId(req.user.userId),
            createdAt: new Date()
        });
        res.status(201).json({ success: true, message: "Recensione salvata" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
