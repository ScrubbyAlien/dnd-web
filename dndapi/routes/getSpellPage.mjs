import manageDB from '../utils/manageSpellDB.mjs'
import { parseObject, parseArray } from '../utils/parse.mjs'
import express from 'express';
const router = express.Router();

router.get('/getSpellPage', async (req, res) => {
    const pagenum = parseInt(req.query.page, 10) || undefined;
    const pagesize = parseInt(req.query.size, 10) || undefined;
    const ordering = parseArray(req.query.ordering) || parseObject(req.query.ordering);

    console.log(pagenum, pagesize, ordering);

    const spellPage = await manageDB.getSpellPage(pagesize, pagenum, ordering);
    console.log(spellPage);
    if (spellPage.length) {
        return res.status(200).json(spellPage);
    }
    return (res.status(500).json({ error: 'Error getting spell page' }))
})

export default router;
