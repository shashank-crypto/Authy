// get organizations from db associated with userid using roles table
// join table role with table organization and get the organization name, role, resources
const getOrganizations = (connection, userid) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT organizations.name, role.role, role.resources FROM role INNER JOIN organizations ON role.organization_id = organizations.id WHERE role.user_id = ?', [userid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        }
        );
    }
    );
}

module.exports = getOrganizations;