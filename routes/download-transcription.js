import { Router } from 'express';
import path from 'path';

const router = Router();

// GET route to download the transcription text file
router.get('/download-transcription/:fileName', (req, res) => {
    try {
        const projectRoot = req.projectRoot;
        const transcriptPath = path.join(projectRoot, 'uploads', req.params.fileName);
        res.download(transcriptPath, req.params.fileName, (err) => {
            if (err) {
                console.error('Error during file download:', err);
                res.status(404).json({ errorMessage: 'File not found.' });
            }
        });
    } catch (error) {
        console.error('Unexpected error during file download:', error);
        res.status(500).json({ errorMessage: 'An unexpected error occurred.' });
    }
});

export default router;
