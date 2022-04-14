import express from 'express';
import getAllSpells from './routes/getAllSpells.mjs';


const app = express();

const port = 8080;
const host = '127.0.0.1';

app.use('/', getAllSpells)


app.get('/', (req, res) => {
    res.status(200).send('D&D API root')
})


app.listen(port, host, () => {
    console.log(`listening on ${host}:${port}`);
});