import fs from 'fs';
import manageDB from './../utils/manageSpellDB.mjs';
import express from 'express';

const router = express.Router();

const spellsPath = '/home/samuel/resources/json/dnd/spells.json'

const allSpellsStr = fs.readFileSync(spellsPath, 'utf8');

const allSpells = JSON.parse(allSpellsStr);


router.get('/insertAllJsonSpells', async function (req, res) {
    const headers = req.headers
    const jsonSpellsInserted = await manageDB.testForInsertedJsonSpells();
    console.log('jsonspells', jsonSpellsInserted);
    let doInsert = false;
    if (headers['user-agent'].includes('curl') && !jsonSpellsInserted) {
        doInsert = true;
    }

    if (doInsert || headers.force) {
        await manageDB.insertSpells(allSpells);
        res.status(200).send('inserted JSON spells\n')
    } else {
        res.status(400).send('could not insert JSON spells\n')
    }
})

export default router;