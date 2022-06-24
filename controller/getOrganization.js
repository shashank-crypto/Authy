// get organizations from db associated with userid using roles table

const createOrganizationTable = require("../db/table/organization");
const createRoleTable = require("../db/table/role");

// join table role with table organization and get the organization name, role, resources
const getOrganizations = (connection, userid) => {
    return new Promise(async (resolve, reject) => {
        await createOrganizationTable(connection);
        await createRoleTable(connection);
        connection.query('SELECT organizations.name, role.role, role.resources, organizations.date_created FROM role INNER JOIN organizations ON role.organization_id = organizations.id WHERE role.user_id = ?', [userid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        }
        );
    }
    );
}

module.exports = getOrganizations;