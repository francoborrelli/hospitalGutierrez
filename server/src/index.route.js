const express = require('express');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const authRoutes = require('./auth/auth.route');
const userRoutes = require('./user/user.route');
const roleRoutes = require('./role/role.route');
const siteRoutes = require('./site/site.route');

const router = express.Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);

const authRouter = express.Router();
authRouter.use('/users', userRoutes);
authRouter.use('/roles', roleRoutes);
authRouter.use('/site', siteRoutes);
router.use('/', expressJwt({ secret: config.jwtSecret }), authRouter);

module.exports = router;
