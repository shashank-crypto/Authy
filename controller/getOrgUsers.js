// get users from role for a specific organization
const getOrgUsers = async (connection, orgId) => {
    try{
        const result = await connection.query('SELECT * FROM role WHERE organization_id = ?', [orgId]);
        console.log('Org users retrieved', result);
        return result;
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = getOrgUsers;