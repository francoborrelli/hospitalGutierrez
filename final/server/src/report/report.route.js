const express = require('express');
const reportCtrl = require('./report.controller');
const hasPermission = require('../auth/hasPermission');

const router = express.Router();

router.route('/').get(hasPermission('reportes_index'), reportCtrl.get);

module.exports = router;
