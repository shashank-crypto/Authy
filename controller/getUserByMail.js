// get user by email
const getUserByEmail = async (connection, email) => {
    try{
        const result = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log('User retrieved', result);
        return result;
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = getUserByEmail;