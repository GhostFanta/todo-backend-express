const router = require('express').Router();
const YAML = require('yamljs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');

const swaggerDocument = YAML.load(path.resolve(__dirname, '../docs/api.yaml'));

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.use('/', require('./api'));

router.use('/api-doc', swaggerUI.serve);
router.get('/api-doc', swaggerUI.setup(swaggerDocument, options));

module.exports = router;
