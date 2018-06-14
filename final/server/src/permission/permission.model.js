const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

PermissionSchema.method({});

PermissionSchema.statics = {};

module.exports = mongoose.model('Permission', PermissionSchema);
