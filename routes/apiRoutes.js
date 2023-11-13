const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        res.json(JSON.parse(data));
    });
});

router.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
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

        fs.writeFile(path.join(__dirname, '../db.json'), JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save note' });
            }
            res.json(req.body);
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== req.params.id);

        fs.writeFile(path.join(__dirname, '../db.json'), JSON.stringify(updatedNotes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete note' });
            }
            res.json({ message: 'Note deleted successfully' });
        });
    });
});

module.exports = router;
