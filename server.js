require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use(routes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// fallback login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Start server
connectDB().then(() => {
    console.log("DB connesso");
    app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
}).catch(err => console.error("Errore connessione DB:", err));
