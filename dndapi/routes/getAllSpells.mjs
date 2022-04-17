import manageDB from '../utils/manageSpellDB.mjs'
import express from 'express';

const router = express.Router();

router.get('/getAllSpells', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(manageDB.allSpells())
})

export default router;