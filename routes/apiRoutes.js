const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});

router.post('/notes', (req, res) => {
    fs.writeFile(path.join(__dirname, '../db.json'), JSON.stringify(req.body), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(req.body);
    });
});

router.delete('/notes/:id', (req, res) => {
    fs.delete(path.join(__dirname, '../db.json'), JSON.stringify(req.body), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(req.body);
    });
});

module.exports = router;