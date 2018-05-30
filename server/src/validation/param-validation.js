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
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }
  },

  checkEmail: {
    query: {
      email: Joi.string()
        .email()
        .required()
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
  },

  createPatient: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      documentNumber: Joi.string().required(),
      birthday: Joi.date().required(),
      gender: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string(),
      hasRefrigerator: Joi.boolean().required(),
      hasElectricity: Joi.boolean().required(),
      hasPet: Joi.boolean().required(),
      documentType: Joi.number().required(),
      insurance: Joi.number(),
      heatingType: Joi.number().required(),
      houseType: Joi.number().required(),
      waterType: Joi.number().required()
    }
  },

  patchPatient: {
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
      documentNumber: Joi.string(),
      birthday: Joi.date(),
      gender: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      documentType: Joi.number(),
      insurance: Joi.number()
    }
  },

  patchDemographicData: {
    body: {
      hasRefrigerator: Joi.boolean(),
      hasElectricity: Joi.boolean(),
      hasPet: Joi.boolean(),
      insurance: Joi.number(),
      heatingType: Joi.number(),
      houseType: Joi.number(),
      waterType: Joi.number()
    }
  }
};
