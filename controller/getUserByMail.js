const createUserTable = require("../db/table/user");

// get user by email
const getUserByEmail = (connection, email) => {
    return new Promise(async (resolve, reject) => {
        await createUserTable(connection);
        connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        }
        );
    }
    );
}

module.exports = getUserByEmail;