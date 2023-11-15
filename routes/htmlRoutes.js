const express = require('express');
const router = express.Router();
const path = require('path');

//route that returns the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//route that returns the index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;