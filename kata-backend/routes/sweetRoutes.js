import express from 'express';
import { addSweet } from '../controllers/sweetController.js';

const router = express.Router();
router.post('/', addSweet);

export default router;
