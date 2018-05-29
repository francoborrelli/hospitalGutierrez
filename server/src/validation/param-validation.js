const Joi = require('joi');

module.exports = {
  // TODO: Validar password
  // POST /users
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      roles: Joi.array().required()
    }
  },

  patchUser: {
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
      username: Joi.string(),
      email: Joi.string().email(),
      active: Joi.bool(),
      roles: Joi.array()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  },

  addRoleToUser: {
    body: {
      roleId: Joi.string()
        .hex()
        .required()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  },

  removeRoleToUser: {
    params: {
      userId: Joi.string()
        .hex()
        .required(),
      roleId: Joi.string()
        .hex()
        .required()
    }
  },

  // POST /auth/login
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },

  checkEmail: {
    query: {
      email: Joi.string().email().required()
    }
  },

  updateSite: {
    body: {
      email: Joi.string().email(),
      title: Joi.string(),
      footer: Joi.string(),
      listAmount: Joi.number(),
      enabled: Joi.boolean()
    }
  }
};
