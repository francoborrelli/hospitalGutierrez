const express = require('express');
const roleCtrl = require('./role.controller');

const router = express.Router();

router.route('/').get(roleCtrl.list);

module.exports = router;
