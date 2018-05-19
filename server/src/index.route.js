const express = require('express');
const authRoutes = require('./auth/auth.route');
const userRoutes = require('./user/user.route');

const router = express.Router();

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
