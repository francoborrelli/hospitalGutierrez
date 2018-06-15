const Role = require('../role/role.model');

async function list(req, res, next) {
  const roles = await Role.find({}).select('name');
  try {
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

module.exports = { list };
