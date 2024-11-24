import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import path from 'path';

const router = Router();
const upload = multer({ dest: 'uploads/' });

function generateFileName(transcription) {
    const firstThreeWords = transcription.split(' ').slice(0, 3).join('_');
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}--${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
    return `${firstThreeWords}_${timestamp}.txt`;
}

router.post('/transcribe', upload.single('audio'), async (req, res) => {
    try {
        const projectRoot = req.projectRoot;
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
            const transcriptPath = path.join(projectRoot, 'uploads', fileName);
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

export default router;
