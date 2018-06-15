const Joi = require('joi');

module.exports = {
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
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
      password: Joi.string().min(6),
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
      password: Joi.string().min(6).required()
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
      phone: Joi.string().allow(null),
      hasRefrigerator: Joi.boolean().required(),
      hasElectricity: Joi.boolean().required(),
      hasPet: Joi.boolean().required(),
      documentType: Joi.number().required(),
      insurance: Joi.number().allow(null),
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
      phone: Joi.string().allow(null),
      documentType: Joi.number(),
      insurance: Joi.number().allow(null)
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
  },

  checkDocument : {
    body: {
      documentType: Joi.number(),
      documentNumber: Joi.string(),
    }
  },

  createClinicalRecord: {
    body: {
      controlDate: Joi.date().required(),
      weight: Joi.number().required(),
      height: Joi.number().allow(null),
      pc: Joi.number().allow(null),
      ppc: Joi.number().allow(null),
      vaccination: Joi.boolean().required(),
      maturation: Joi.boolean().required(),
      fisicTest: Joi.boolean().required(),
      vaccinationObservation: Joi.string().allow(null),
      maturationObservation: Joi.string().allow(null),
      fisicTestObservation: Joi.string().allow(null),
      generalObservation: Joi.string().allow(null),
      nutrition: Joi.string().allow(null),
      user: Joi.string().required(),
    }
  },

  patchClinicalRecord: {
    body: {
      controlDate: Joi.date(),
      weight: Joi.number(),
      height: Joi.number().allow(null),
      pc: Joi.number().allow(null),
      ppc: Joi.number().allow(null),
      vaccination: Joi.boolean(),
      maturation: Joi.boolean(),
      fisicTest: Joi.boolean(),
      vaccinationObservation: Joi.string().allow(null),
      maturationObservation: Joi.string().allow(null),
      fisicTestObservation: Joi.string().allow(null),
      generalObservation: Joi.string().allow(null),
      nutrition: Joi.string().allow(null),
      user: Joi.string(),
    }
  }

};
