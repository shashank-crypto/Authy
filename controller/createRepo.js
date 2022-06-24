const {v4 : uuidv4} = require('uuid');
const createRepositoryTable = require("../db/table/repo");

// create repo
const createRepo = (connection, name, orgId) => {
    return new Promise(async (resolve, reject) => {
        const id = uuidv4();
        await createRepositoryTable(connection);
        connection.query('INSERT INTO repositories (id, name, organization_id) VALUES (?, ?, ?)', [id, name, orgId], (err, results) => {
            if (err) return reject(err);
            resolve({"id" : id, "name" : name});
        }
        );
    }
    );
}

module.exports = createRepo; 