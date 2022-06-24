const {v4: uuidv4} = require('uuid');
const createOrganizationTable = require('../db/table/organization');

// insert into organization table controller
const insertOrganisation = (connection, name) => {
    return new Promise(async (resolve, reject) => {
        const id = uuidv4();
        await createOrganizationTable(connection);
        connection.query('INSERT INTO organizations (id, name) VALUES (?, ?)', [id, name], (err, result) => {
            if (err) return reject(err);
            resolve({"id" : id, "name" : name});
        }
        );
    }
    );
}

module.exports = insertOrganisation;