const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.json');
// const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        res.json(JSON.parse(data));
    });
});

router.post('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        let notes;
        try {
            notes = JSON.parse(data);
            if (!Array.isArray(notes)) {
                notes = [];
            }
        } catch (parseErr) {
            notes = [];
        }
        notes.push(req.body);

        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save note' });
            }
            res.json(req.body);
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== req.params.id);

        fs.writeFile(dbPath, JSON.stringify(updatedNotes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete note' });
            }
            res.json({ message: 'Note deleted successfully' });
        });
    });
});

module.exports = router;
