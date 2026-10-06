import { Router } from 'express';
import homeRouter from './home.js';
import submitRouter from './submit.js';

const router = Router();

// Demos 2 and 3 are disabled: the Whisper transcription and the Twilio
// carrier lookup. Their route modules are still in this directory
// (transcribe.js, download-transcription.js, lookup.js) so they can be turned
// back on by importing them again and restoring the mounts below in place of
// the disabled handler.
//
// These answer instead of being left unmounted so a direct request gets a
// clear 503 rather than a 404 that reads like a broken deployment. Mounting
// with `use` covers every method and any subpath.
const disabled = (demo) => (req, res) => {
    const message = `The ${demo} demo is currently disabled.`;
    res.status(503).json({ data: null, error: message, errorMessage: message });
};

// Modularized routing
router.use('/', homeRouter);
router.use('/submit', submitRouter);

// Disabled demos
router.use('/transcribe', disabled('transcription'));
router.use('/download', disabled('transcription'));
router.use('/download-transcription', disabled('transcription'));
router.use('/lookup', disabled('carrier lookup'));

export default router;
