//create organisation table if doesn't exist
const createOrganizationTable = (connection) => {
    connection.query('CREATE TABLE IF NOT EXISTS organizations (id VARCHAR(90) PRIMARY KEY, name VARCHAR(255))', (err, result) => {
        if (err) {
            console.log(err);
            return Error(err);
        }
        console.log('Table created', result);
    }
    );
}

module.exports = createOrganizationTable;