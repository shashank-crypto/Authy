// create repository table if doesn't exist with foreign key on organization table
const createRepositoryTable = async (connection) => {
    try{
        await connection.query('CREATE TABLE IF NOT EXISTS repositories (id VARCHAR(40) PRIMARY KEY, name VARCHAR(255), organization_id VARCHAR(40), FOREIGN KEY (organization_id) REFERENCES organizations(id))');
        console.log('Table created');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = createRepositoryTable;