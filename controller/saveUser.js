const createUserTable = require("../db/table/user");

// insert a new user into the database
const saveUser = async (connection, id, name, email, authSvc) => {
    try{
        await createUserTable(connection);
        await connection.query('INSERT INTO users (id, name, email, auth_svc) VALUES (?, ?, ?, ?)', [id, name, email, authSvc]);
        console.log('User inserted');
        return {"id" : id, "name" : name, "email" : email, "authSvc" : authSvc};
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = saveUser;