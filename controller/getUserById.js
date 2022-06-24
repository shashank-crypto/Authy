// get user by id
const getUserById = async (connection, id) => {
    try{
        const result = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        console.log('User retrieved', result);
        return result;
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = getUserById;