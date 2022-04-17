import express from 'express';
import getAllSpells from './routes/getAllSpells.mjs';
import insertAllJsonSpells from './routes/insertAllJsonSpells.mjs';
import testMysqlFunc from './routes/testMysqlFunc.mjs';
import getSpellPage from './routes/getSpellPage.mjs';

const app = express();

const port = 8080;
const host = '127.0.0.1';

app.use('/', getAllSpells);
app.use('/', getSpellPage);
app.use('/internal', insertAllJsonSpells);
app.use('/internal', testMysqlFunc);

app.get('/', (req, res) => {
    res.status(200).send('D&D API root');
})


app.listen(port, host, () => {
    console.log(`listening on ${host}:${port}`);
});