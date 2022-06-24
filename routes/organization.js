const router = require('express').Router();
const getOrganizations = require('../controller/getOrganization');
const getOrgUsers = require('../controller/getOrgUsers');
const getPermission = require('../controller/getPermission');
const getUserById = require('../controller/getUserById');
const setRole = require('../controller/setRole');
const connection = require('../db/conn');

router.post('/', async (req, res) => {
    const { orgName } = req.body;
    const userId = req.user;
    try {
        const { id, name } = await createOrg(connection, orgName, userId);
        res.json({"id": id, "name": name});
    }
    catch (err) {
        console.log(err);
    }
})

router.get('/', async (req, res) => {
    const userId = req.user;
    try {
        const orgs = await getOrganizations(connection, userId);
        res.json(orgs);
    }
    catch (err) {
        console.log(err);
    }
})

router.get('/:orgId/users', async (req, res) => {
    const orgId = req.params.orgId;
    try {
        const users = await getOrgUsers(connection, orgId);
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/:orgId/users', async (req, res) => {
    const { orgId } = req.params;
    const userId = req.user;
    const { role } = req.body;
    try {
        const permission = await getPermission(connection, orgId, userId);
        if (permission.length == 0) res.send('You are not associated with this organization');
        if (permission[0]?.role !== 'admin') {
            res.status(403).json({ error: 'You are not an admin' });
        }
        if (permission[0]?.resources !== '*' || permission[0]?.resources !== 'user') {
            res.status(403).json({ error: 'You do not have add any user and roles' });
        }
        role.forEach(async element => {
            const user = await getUserById(connection, element.userId);
            if (user.length == 0) return
            const {id} = await setRole(connection, orgId, element.userId, element.role, element.resource);
            console.log('Role inserted', id);
        });
        res.send('Roles added');
    }
    catch (err) {
        console.log(err);
    }
})
