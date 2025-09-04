const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });//added timestamps

const User = mongoose.model('User', userSchema);//creates collection in the database users using userSchema.

module.exports = User;
