const Joi = require('joi');

module.exports = {
  // POST /users
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
    }
  },

  // UPDATE /users/:userId
  updateUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      active: Joi.bool().required()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  },

  // POST /auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
