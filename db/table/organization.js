//create organisation table if doesn't exist
const createOrganizationTable = async (connection) => {
    try{
        await connection.query('CREATE TABLE IF NOT EXISTS organizations (id VARCHAR(40) PRIMARY KEY, name VARCHAR(255))');
        console.log('Table created');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = createOrganizationTable;