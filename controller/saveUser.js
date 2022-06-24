const createUserTable = require("../db/table/user");

// insert a new user into the database
const saveUser = (connection, id, name, email, authSvc) => {
    return new Promise(async (resolve, reject) => {
        await createUserTable(connection);
        connection.query('INSERT INTO users (id, name, email, auth_svc) VALUES (?, ?, ?, ?)', [id, name, email, authSvc], (err, results) => {
            if (err) return reject(err);
            resolve({ "id" : id, "name" : name, "email" : email, "authSvc" : authSvc });
        }
        );
    }
    );
}

module.exports = saveUser;