const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const dbFolder = path.join(__dirname, 'db'); // Path to your db folder

app.use(express.static('public')); // Serve static files from the 'public' folder

// Endpoint to search files
app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const results = [];

    // Read files from the 'db' folder
    fs.readdir(dbFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading files' });
        }

        // Filter files that match the search query
        files.forEach(file => {
            if (file.toLowerCase().includes(query)) {
                results.push(file);
            }
        });

        // Send matching files as a JSON response
        res.json(results);
    });
});

// Serve the HTML page (make sure it's inside a folder like 'public')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
