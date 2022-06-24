// insert into role table controller
const {v4: uuidv4} = require('uuid');
const createRoleTable = require('../db/table/role');

const setRole = (connection, orgId, userId, role, resource) => {
    return new Promise(async (resolve, reject) => {
        await createRoleTable(connection);
        const id = uuidv4();
        connection.query('INSERT INTO role (id, user_id, organization_id, role, resources) VALUES (?, ?, ?, ?, ?)', [id, userId, orgId, role, resource], (err, results) => {
            if (err) return reject(err);
            resolve({"id" : id, "userId" : userId, "orgId" : orgId, "role" : role, "resources" : resource});
        }
        );
    }
    );
}

module.exports = setRole;