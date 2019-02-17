var router = require('express').Router();

router.use('/', require("./api/todolists"));
router.use('/todolist', require("./api/todolist"));
router.use('/user', require("./api/users"));

module.exports = router;