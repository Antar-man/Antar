const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  questionnaire: {
    mood: String,
    stress: String,
    sleepHours: Number,
  },
  growth:{
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },  
    health: { type: Number, default: 100 },
  }
  
}, { timestamps: true });//added timestamps

const User = mongoose.model('User', userSchema);//creates collection in the database users using userSchema.

module.exports = User;
