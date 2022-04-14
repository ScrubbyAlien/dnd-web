import { getSpells } from '../utils/getSpells.mjs';
import express from 'express';

const router = express.Router();

router.get('/getAllSpells', (req, res) => {
    console.log(getSpells.allSpells);
    res.status(200).json(getSpells.allSpells)
})

export default router;