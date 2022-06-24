// get organizations from db associated with userid using roles table
// join table role with table organization and get the organization name, role, resources
const getOrganizations = async (connection, userid) => {
    try{
        const result = await connection.query('SELECT organizations.name, role.role, role.resources FROM role INNER JOIN organizations ON role.organization_id = organizations.id WHERE role.user_id = ?', [userid]);
        console.log('Organizations retrieved', result);
        return result;
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = getOrganizations;