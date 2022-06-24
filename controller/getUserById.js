// get user by id
const getUserById = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        }
        );
    }
    );
}

module.exports = getUserById;