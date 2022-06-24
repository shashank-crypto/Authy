const router = require('express').Router();
const googleAuth = require('../auth/googleAuth');
const facebookAuth = require('../auth/facebookAuth');
const twitterAuth = require('../auth/twitterAuth');

router.use('/', googleAuth);
router.use('/', facebookAuth);
router.use('/', twitterAuth);

module.exports = router;