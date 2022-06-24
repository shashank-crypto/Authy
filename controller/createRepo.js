const createRepositoryTable = require("../db/table/repo");

const createRepo = async (connection, name, orgId) => {
    const id = uuidv4();
    try{
        await createRepositoryTable(connection);
        await connection.query('INSERT INTO repositories (id, name, organization_id) VALUES (?, ?, ?)', [id, name, orgId]);
        console.log('Repository created');
        return {id, name};
    }
    catch(err){
        console.log(err);
    }
}

module.exports = createRepo; 