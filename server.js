const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory storage for letters (in production, use a database)
let letters = [];
let letterIdCounter = 1;

// API Routes

// Get all letters
app.get('/api/letters', (req, res) => {
    // Return letters without any identifying information
    const anonymousLetters = letters.map(letter => ({
        id: letter.id,
        content: letter.content,
        timestamp: letter.timestamp
    }));
    res.json(anonymousLetters);
});

// Send a new letter
app.post('/api/letters', (req, res) => {
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: 'Letter content is required' });
    }
    
    const newLetter = {
        id: letterIdCounter++,
        content: content.trim(),
        timestamp: new Date().toISOString()
    };
    
    letters.push(newLetter);
    
    // Return the letter without any identifying information
    res.status(201).json({
        id: newLetter.id,
        content: newLetter.content,
        timestamp: newLetter.timestamp
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Antar server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} to access the platform`);
});