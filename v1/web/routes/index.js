const router = require('express').Router();

router.use('/v1', require("./api_v1/"));
router.use('/v2', require("./api_v2"));

module.exports = router;