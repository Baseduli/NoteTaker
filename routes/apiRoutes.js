const fs = require('fs');
const path = require('path');

app.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});