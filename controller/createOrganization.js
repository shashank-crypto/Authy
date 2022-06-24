// create organization
const insertOrganisation = require("./insertOrg");
const setRole = require("./setRole");

// insert into organization and create a role for the user
const createOrganization = (connection, org_name, user_id) => {
    const {id, name} = await insertOrganisation(connection, org_name);
    await setRole(connection, id, user_id, "admin", "*");
    return {id, name};
}


module.exports = createOrganization;