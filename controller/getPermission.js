// get the role when org_id and user_id are matched
const getPermission = (connection, orgId, userId) => {
    try{
        const result = await connection.query('SELECT * FROM role WHERE organization_id = ? AND user_id = ?', [orgId, userId]);
        console.log('Permission retrieved', result);
        return result;
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = getPermission;