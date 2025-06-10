const express = require('express');
const bodyParser = require('body-parser');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Service account credentials
const CREDENTIALS = require('./gen-lang-client-0622333307-a77c6337b3af.json');

// Configure the ID of your Google Sheet - you'll need to create this and share it with your service account email
const SHEET_ID = process.env.SHEET_ID || '1DbwcAt6Zy2QPgBXKn6l6XjyOC7MV21adLyBMmLaUWFs'; // Replace with your actual sheet ID

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from current directory

// Handle waitlist form submission
app.post('/api/join-waitlist', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        // Connect to the Google Sheet
        const doc = new GoogleSpreadsheet(SHEET_ID);
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key,
        });

        // Load the document and first sheet
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // Use the first sheet
        
        // Add a row to the sheet
        await sheet.addRow({
            email: email,
            date: new Date().toISOString(),
        });

        return res.json({ success: true, message: 'Thank you for joining our waitlist!' });
    } catch (error) {
        console.error('Error adding to waitlist:', error);
        return res.status(500).json({ success: false, message: 'Failed to add you to the waitlist' });
    }
});

// Catch-all route for serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
