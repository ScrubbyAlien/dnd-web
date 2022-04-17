import { con } from './mysql.mjs';

const convertSpellObjToValueArray = function (spellObj) {
    const casting_time = spellObj.casting_time;
    const classes = spellObj.classes.join(';');
    const {
        material: component_m,
        somatic: component_s,
        verbal: component_v
    } = spellObj.components;
    const spell_description = spellObj.description;
    const duration = spellObj.duration;
    const spell_level = spellObj.level === 'cantrip' ? 0 : parseInt(spellObj.level, 10);
    const spell_name = spellObj.name;
    const spell_range = spellObj.range;
    const ritual = spellObj.ritual;
    const school = spellObj.school;
    const tags = spellObj.tags.join(';');
    const type = spellObj.type;

    return [
        casting_time,
        classes,
        component_v,
        component_s,
        component_m,
        spell_description,
        duration,
        spell_level,
        spell_name,
        spell_range,
        ritual,
        school,
        tags,
        type
    ]
}

const getSpellByName = async function (name) {
    let ret = {};
    await con.query('SELECT * FROM spells WHERE spell_name = ?', name)
        .then(res => {
            ret = res[0][0]
        })
        .catch(err => {
            console.log(err);
        })
    return ret;
}

/**
 * Inserts a spell into the spell table on dnd_db.
 * @param {{
 *      casting_time: String,
 *      classes: Array,
 *      components: Array,
 *      description: String,
 *      duration: String,
 *      level: String,
 *      name: String,
 *      range: String,
 *      ritual: Boolean,
 *      school: String,
 *      tags: Array,
 *      type: String
 * }} spellObj - An object containing all properties of a spell
 */
const insertSpell = async function (spellObj) {
    if (getSpellByName(spellObj.name)) {
        throw new Error(`Spell with name ${spellObj.name} already exists`)
    }

    const query = `
        INSERT INTO spells 
        (
            casting_time, classes, component_v, component_s, component_m, 
            spell_description, duration, spell_level, spell_name, spell_range,
            ritual, school, tags, spell_type
        )
        VALUES  ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );
    `;
    const values = convertSpellObjToValueArray(spellObj);


    await con.query(query, values)
        .then(results => {
            // console.log(`Inserted ${results.spell_name}`);
        })
        .catch(err => {
            throw err;
        })
}

/**
 * Inserts all spells in the array into the spells table on dnd_db
 * @param {Array} spellArray - the array of spells to be inserted
 */
const insertSpells = async function (spellArray) {
    await con.query('START TRANSACTION;')
    let insertFailed = false
    spellArray.forEach(async (spell) => {
        if (insertFailed) {
            return;
        }
        try {
            await insertSpell(spell);
        } catch (error) {
            await con.query('ROLLBACK;')
            insertFailed = true;
            console.log('Insertion failed', error);
            return;
        }
    })
    if (insertFailed) {
        return;
    }
    await con.query('COMMIT;')
    console.log('Insertions complete');
}

const testForInsertedJsonSpells = async function () {
    let ret = false
    await con.query("SELECT * FROM spells WHERE spell_name = 'Acid Splash';")
        .then(results => {
            if (results[0].length !== 0) {
                ret = true;
            }
        })
        .catch(error => {
            console.log(error);
        });
    return ret;
}

const getAllSpells = async function () {
    let ret = [];
    await con.query('SELECT * FROM spells')
        .then(results => ret = results[0])
        .catch(error => console.log(error));
    return ret;
}


/**
 * Gets page pageNumber that is pageSize number of spells long, ordered determined by ordering object
 * @param {Number} pageSize - the number of spells on each page.
 * @param {Number} pageNumber - the page number to return, first page is page zero
 * @param {Array|Object} ordering - an object (or array of objects) that determines the ordering of the spells.
 *                                  Each object consists of two properties: prop and reverse. 
 *                                  Prop can be any of: 'name', 'level', 'school',
 *                                  Reverse is a boolean value that indicates whether to reverse the ordering on that property.
 *                                  Example: {prop: name, reverse: true} would order alfabetically in reverse, meaning z - a.
 *                                  Ordering of order objects matter, the earlier objects in the array have higher priority than later objects
 * @returns {Array} an array of spells on the defined page.
 */
const getSpellPage = async function (pageSize = 20, pageNumber = 0, ordering = { prop: 'level', reverse: false }) {
    let ret = [];
    const orderingDict = {
        name: 'spell_name',
        level: 'spell_level',
        school: 'school'
    };

    let orderStr = ''

    if (Array.isArray(ordering)) {
        ordering.forEach((order, index, array) => {
            if (!order.hasOwnProperty('prop')) {
                return;
            }

            orderStr += orderingDict[order.prop];
            orderStr += order.reverse ? ' desc' : '';
            if (array.length !== index + 1) {
                orderStr += ', ';
            }
        })
    } else {
        if (ordering.hasOwnProperty('prop')) {
            orderStr += orderingDict[ordering.prop];
            orderStr += ordering.reverse ? ' desc' : '';
        }
    }



    const query = `SELECT * FROM spells${orderStr ? ' ORDER BY ' + orderStr : ''} LIMIT ?, ?`;
    const values = [pageNumber * pageSize, pageSize];

    await con.query(query, values)
        .then(results => {
            ret = results[0];
        })
        .catch(err => {
            console.log(err);
        })

    return ret;
}



export default {
    insertSpells,
    testForInsertedJsonSpells,
    allSpells: getAllSpells,
    getSpellByName,
    getSpellPage
};