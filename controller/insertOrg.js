const {v4: uuidv4} = require('uuid');
const createOrganizationTable = require('../db/table/organization');

// insert into organization table controller
const insertOrganisation = async (connection, name) => {
    const id = uuidv4();
    try{
        await createOrganizationTable(connection);
        const result = await connection.query('INSERT INTO organizations (id, name) VALUES (?, ?)', [id, name]);
        console.log('Organization inserted', result);
        return {id, name};
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = insertOrganisation;