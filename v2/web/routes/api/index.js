const router = require('express').Router();

router.use('/', require('./todolist'));
router.use('/user', require('./user'));

module.exports = router;
