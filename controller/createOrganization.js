// create organization
const insertOrganisation = require("./insertOrg");
const setRole = require("./setRole");

// insert into organization and create a role for the owner
const createOrganization = (connection, org_name, user_id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const org = await insertOrganisation(connection, org_name);
            await setRole(connection, org.id, user_id, "admin", "*");
            resolve({"id" : org.id, "name" : org.name});
        }
        catch(err) {
            reject(err);
        }
    }
    );
}

module.exports = createOrganization;