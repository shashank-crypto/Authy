// get users from role for a specific organization
const getOrgUsers = (connection, orgId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT users.id, users.name, users.email, role.role, role.resources FROM role INNER JOIN users ON role.user_id = users.id WHERE role.organization_id = ?', [orgId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        }
        );
    }
    );
}

module.exports = getOrgUsers;