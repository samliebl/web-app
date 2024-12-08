import express from 'express';
import twilio from 'twilio';

const router = express.Router();

router.post('/', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        // Fetch line type intelligence for carrier details
        const data = await client.lookups.v2.phoneNumbers(phoneNumber).fetch({
            fields: ['line_type_intelligence']
        });


        // Properly access and map nested properties
        const responseData = {
            country_code: data.countryCode ?? 'N/A',
            phone_number: data.phoneNumber ?? 'N/A',
            national_format: data.nationalFormat ?? 'N/A',
            caller_name: data.callerName ?? 'N/A',
            carrier: {
                mobile_country_code: data.lineTypeIntelligence?.mobile_country_code ?? 'N/A',
                mobile_network_code: data.lineTypeIntelligence?.mobile_network_code ?? 'N/A',
                name: data.lineTypeIntelligence?.carrier_name ?? 'N/A',
                type: data.lineTypeIntelligence?.type ?? 'N/A',
                error_code: data.lineTypeIntelligence?.error_code ?? 'N/A'
            },
            url: data.url ?? 'N/A'
        };

        res.json({ data: responseData, error: null });
    } catch (error) {
        console.error('Error fetching phone number details:', error.message);
        res.json({ data: null, error: error.message });
    }
});

export default router;
