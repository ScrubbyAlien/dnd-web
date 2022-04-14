import fs from 'fs';

const spellsPath = '/home/samuel/resources/json/dnd/spells.json'

const allSpellsStr = fs.readFileSync(spellsPath, 'utf8');

const allSpells = JSON.parse(allSpellsStr);

const findSpell = function(match) {
    return allSpells.find(match);
}

const filterSpells = function(filter) {
    return allSpells.filter(filter)
}

export const getSpells = {
    allSpells,
    findSpell,
    filterSpells 
}