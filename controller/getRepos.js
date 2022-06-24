const getRepos = (connection, orgId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM repositories WHERE organization_id = ?', [orgId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        }
        );
    }
    );
}