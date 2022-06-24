// create user table if deosn't exist
const createUserTable = (connection) => {
    connection.query('CREATE TABLE IF NOT EXISTS users (id VARCHAR(90) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, auth_svc VARCHAR(30))', (err, result) => {
        if (err) {
            console.log(err);
            return Error(err);
        }
        console.log('Table created', result);
    }
    );
}

module.exports = createUserTable;