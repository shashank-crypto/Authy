// create a table if doesn't exist named 'role' with foreign key on users table and organization table
const createRoleTable = async (connection) => {
    try{
        await connection.query('CREATE TABLE IF NOT EXISTS role (id VARCHAR(40) PRIMARY KEY, user_id VARCHAR(40), organization_id VARCHAR(40), role VARCHAR(30), resources INT, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (organization_id) REFERENCES organizations(id))');
        console.log('Table created');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = createRoleTable;