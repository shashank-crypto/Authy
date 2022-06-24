// get the role when org_id and user_id are matched
const getPermission = (connection, orgId, userId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM role WHERE organization_id = ? AND user_id = ?', [orgId, userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        }
        );
    }
    );
}

module.exports = getPermission;