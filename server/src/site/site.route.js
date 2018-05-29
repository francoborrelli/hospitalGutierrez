const express = require('express');
const siteCtrl = require('./site.controller');

const router = express.Router();

router.route('/').get(siteCtrl.get);

module.exports = router;
