const router = require('express').Router();
const createOrganization = require('../controller/createOrganization');
const getOrganizations = require('../controller/getOrganization');
const getOrgUsers = require('../controller/getOrgUsers');
const getPermission = require('../controller/getPermission');
const getUserById = require('../controller/getUserById');
const setRole = require('../controller/setRole');
const connection = require('../db/conn');

router.use('/:orgId/repos', require('./repo'))

router.post('/', async (req, res) => {
    const { orgNames } = req.body;
    const userId = req.user || '118112290937553408948';
    try {
        let result = [];
        orgNames.forEach(async orgName => {
            const createOrg = await createOrganization(connection, orgName, userId);
            console.log(createOrg);
            result.push(orgName);
        console.log(result);
        })
        console.log("result");
        return res.send({"msg" : `${orgNames} created successfully`});
    }
    catch (err) {
        console.log(err);
        return res.status(402).json(err);
    }
})

router.get('/', async (req, res) => {
    const userId = req.user || '118112290937553408948';
    try {
        const orgs = await getOrganizations(connection, userId);
        res.json(orgs);
    }
    catch (err) {
        console.log(err);
        return res.status(402).json(err);
    }
})

router.get('/:orgId/users', async (req, res) => {
    const orgId = req.params.orgId;
    try {
        const users = await getOrgUsers(connection, orgId);
        return res.json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(402).json(err);
    }
})

router.post('/:orgId/users', async (req, res) => {
    const { orgId } = req.params;
    const userId = req.user || '118112290937553408948';
    const { role } = req.body;
    try {
        const permission = await getPermission(connection, orgId, userId);
        console.log(permission);
        if (permission.length == 0) res.send('You are not associated with this organization');
        if (permission[0]?.role !== 'admin') {
            return res.status(403).json({ error: 'You are not an admin' });
        }
        if (permission[0]?.resources !== '*' && permission[0]?.resources !== 'user') {
            return res.status(403).json({ error: 'You do not have the right permission' });
        }
        role.forEach(async element => {
            const user = await getUserById(connection, element.userId);
            if (user.length == 0) {
                console.log('user not found', element.userId);
                return
            }
            const result = await setRole(connection, orgId, element.userId, element.role, element.resource);
            console.log('Role inserted', result.id);
        });
        return res.send({'msg' : 'Roles added'});
    }
    catch (err) {
        console.log(err);
        return res.status(402).json(err);
    }
})

module.exports = router;
