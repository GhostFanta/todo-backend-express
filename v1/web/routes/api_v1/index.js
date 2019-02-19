const router = require('express').Router();

router.use('/', require("../api_v1/todolists"));
router.use('/todolist', require("../api_v1/todolist"));
router.use('/user', require("../api_v1/users"));

module.exports = router;