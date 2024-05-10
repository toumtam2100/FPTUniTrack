const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  RoleID: Number,
  RoleName: String,
}, { collection: 'Role' });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
