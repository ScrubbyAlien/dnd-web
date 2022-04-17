CREATE TABLE IF NOT EXISTS spells (
    id INTEGER AUTO_INCREMENT,
    casting_time VARCHAR(255),
    classes VARCHAR(255),
    component_v BOOLEAN,
    component_s BOOLEAN,
    component_m BOOLEAN,
    spell_description VARCHAR(4095),
    duration VARCHAR(255),
    spell_level INTEGER,
    spell_name VARCHAR(255),
    spell_range VARCHAR(255),
    ritual BOOLEAN,
    school VARCHAR(255),
    tags VARCHAR(255),
    spell_type VARCHAR(255),
    PRIMARY KEY (id)
)