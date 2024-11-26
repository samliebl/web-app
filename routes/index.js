import { Router } from 'express';
import homeRouter from './home.js';
import submitRouter from './submit.js';
import transcribeRouter from './transcribe.js';
import downloadTranscriptionRouter from './download-transcription.js';
import lookupRouter from './lookup.js';

const router = Router();

// Modularized routing
router.use('/', homeRouter);
router.use('/submit', submitRouter);
router.use('/transcribe', transcribeRouter);
router.use('/download', downloadTranscriptionRouter);
router.use('/lookup', lookupRouter); // Include Twilio Lookup route

export default router;
