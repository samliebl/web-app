import express from 'express';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Define __dirname for ES modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

// Data object for rendering context
const data = {
    site: {
        title: 'Web App',
        links: [
            {
                rel: 'stylesheet',
                href: '/css/main.css'
            },
        ],
        js: [
            '/js/main.js'
        ]
    },
    pages: [{
        index: null
    }]
};

// Wrapper for data to make templating easier
const wrapper = { data };

// Configure Nunjucks with layouts
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Helper function to generate a dynamic file name for the transcription
function generateFileName(transcription) {
    const firstThreeWords = transcription.split(' ').slice(0, 3).join('_');
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}--${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
    return `${firstThreeWords}_${timestamp}.txt`;
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// GET route to render the homepage with Nunjucks
app.get('/', (req, res) => {
    res.render('index.njk', wrapper);
});

// Simple POST route for name submission
app.post('/submit', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}! This is a POST response.` });
});

// Route to handle file upload and transcription with Whisper
app.post('/transcribe', upload.single('audio'), async (req, res) => {
    try {
        const audioFilePath = req.file.path;
        const form = new FormData();
        form.append('file', fs.createReadStream(audioFilePath), {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });
        form.append('model', 'whisper-1');

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                ...form.getHeaders(),
            },
            body: form,
        });

        const data = await response.json();

        if (data.text) {
            const fileName = generateFileName(data.text);
            const transcriptPath = path.join(__dirname, 'uploads', fileName);
            fs.writeFileSync(transcriptPath, data.text);

            res.json({ transcription: data.text, fileName });
        } else {
            res.json({ errorMessage: 'Transcription failed. Please try again.' });
        }
    } catch (error) {
        console.error('Error during transcription process:', error);
        res.json({ errorMessage: 'An unexpected error occurred during transcription.' });
    }
});

// Route to download the transcription text file
app.get('/download-transcription/:fileName', (req, res) => {
    const transcriptPath = path.join(__dirname, 'uploads', req.params.fileName);
    res.download(transcriptPath, req.params.fileName, (err) => {
        if (err) {
            console.error('Error during file download:', err);
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});