import { Router } from 'express';
import homeRouter from './home.js';
import submitRouter from './submit.js';
import transcribeRouter from './transcribe.js';
import downloadTranscriptionRouter from './download-transcription.js';

const router = Router();

// Use modularized routes
router.use('/', homeRouter); // Handles homepage
router.use('/submit', submitRouter); // Handles POST /submit
router.use('/', transcribeRouter); // POST /transcribe
router.use('/', downloadTranscriptionRouter); // Download route

export default router;
