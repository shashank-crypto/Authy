// create repository table if doesn't exist with foreign key on organization table
const createRepositoryTable = (connection) => {
    connection.query('CREATE TABLE IF NOT EXISTS repositories (id VARCHAR(90) PRIMARY KEY, name VARCHAR(255), organization_id VARCHAR(90), FOREIGN KEY (organization_id) REFERENCES organizations(id))', (err, result) => {
        if (err) {
            console.log(err);
            return Error(err);
        }
        console.log('Table created', result);
    }
    );
}

module.exports = createRepositoryTable;