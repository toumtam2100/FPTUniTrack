const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    RoleID: Number,
    Username: [String],
}, { collection: 'UserRole' });

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;
