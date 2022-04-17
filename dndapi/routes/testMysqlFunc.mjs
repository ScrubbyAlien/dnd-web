import manageDB from '../utils/manageSpellDB.mjs'
import { parseBoolean, parseArray, parseObject } from '../utils/parse.mjs'
import express from 'express';

const router = express.Router();

const joinArgs = (args) => {
    const map = args.map(arg => JSON.stringify(arg));
    return map.join(', ');
}

router.get('/testMysqlFunc', async (req, res) => {
    // res.send(req.query);

    if (!req.query.func && !req.query.args) {
        res.status(400).send('Provide func and args parameters\n')
    }


    const func = req.query.func;
    let args = '';
    if (req.query.args) {
        args = req.query.args.replace(/_/g, ' ').split(';');

        args = args.map(arg => {
            if (parseInt(arg, 10)) {
                return parseInt(arg, 10)
            }
            else if (parseBoolean(arg)) {
                return parseBoolean(arg)
            }
            else if (parseArray(arg)) {
                return parseArray(arg)
            }
            else if (parseObject(arg)) {
                return parseObject(arg)
            }
            else {
                return arg;
            }
        })
    }

    if (!manageDB.hasOwnProperty(func)) {
        res.status(400).send('No such function\n');
    }


    const retObj = args.length === 0 ? await manageDB[func]() : await manageDB[func](...args);

    const testResultStr = `testing func ${func} with ${args ? 'arguments: ' + joinArgs(args) : 'no arguments'}.\n => \n`

    console.log(testResultStr, retObj);
    res.status(200).send(testResultStr + JSON.stringify(retObj, null, 2) + '\n');
})

export default router;