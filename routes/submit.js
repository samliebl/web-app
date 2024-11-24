import { Router } from 'express';

const router = Router();

// POST route for name submission
router.post('/', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}! This is a POST response.` });
});

export default router;
