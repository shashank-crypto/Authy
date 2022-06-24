// create a table if doesn't exist named 'role' with foreign key on users table and organization table
const createRoleTable = (connection) => {
    connection.query('CREATE TABLE IF NOT EXISTS role (id VARCHAR(90) PRIMARY KEY, user_id VARCHAR(90), organization_id VARCHAR(90), role VARCHAR(30), resources VARCHAR(20), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (organization_id) REFERENCES organizations(id))', (err, result) => {
        if (err) {
            console.log(err);
            return Error(err);
        }
        console.log('Table created', result);
    }
    );
}

module.exports = createRoleTable;