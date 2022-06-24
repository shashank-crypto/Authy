// create a table if deosn't exist
const createUserTable = async (connection) => {
    try{
        await connection.query('CREATE TABLE IF NOT EXISTS users (id VARCHAR(40) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, auth_svc VARCHAR(30))');
        console.log('Table created');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = createUserTable;