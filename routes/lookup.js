import express from 'express';
import twilio from 'twilio';

const router = express.Router();

router.post('/', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const data = await client.lookups.v1.phoneNumbers(phoneNumber).fetch({ type: ['carrier'] });

        res.json({ data, error: null });
    } catch (error) {
        console.error('Error fetching phone number details:', error.message);
        res.json({ data: null, error: error.message });
    }
});

export default router;
