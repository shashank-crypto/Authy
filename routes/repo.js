const router = require('express').Router({ mergeParams: true });
const getPermission = require('../controller/getPermission');
const connection = require('../db/conn');
const createRepo = require('../controller/createRepo');

router.get('/', async (req, res) => {
        const userId = req.user || '118112290937553408948';
        const { orgId } = req.params;
        try {
            console.log(orgId, userId);
            const permission = await getPermission(connection, orgId, userId);
            console.log(permission);
            if (permission.length === 0) 
                return res.send({"msg" :'You are not associated with this organization'});
            const repos = await getRepos(connection, orgId);
            return res.json(repos);
        }
        catch (err) {
            console.log(err);
            return res.status(402).json(err);
        }
    }
)

router.post('/', async (req, res) => {
    const userId = req.user || '118112290937553408948';
    const { orgId } = req.params;
    const { repoName } = req.body;
    try {
        console.log(orgId, userId);
        const permission = await getPermission(connection, orgId, userId);
        if (permission.length === 0) return res.send({"msg" :'You are not associated with this organization'});
        if (permission[0].role !== 'admin') 
            return res.status(402).send({"msg" :'You are not an admin of this organization'});
        if (permission[0]?.resources !== '*' && permission[0]?.resources !== 'repo') 
            return res.status(402).send({"msg" :'You do not have permission to create a repository'});
        const repos = await createRepo(connection, repoName, orgId);
        return res.json(repos);
    }
    catch (err) {
        console.log(err);
        return res.status(402).json(err);
    }
})


module.exports = router;