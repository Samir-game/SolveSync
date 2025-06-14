const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },

  email:{
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber:{
    type: String,
  },

  codeforcesHandle: {
    type: String,
    required:true,
    unique: true,
  },

  currentRating: {
    type: Number,
    default:0,
  },

  maxRating: {
    type: Number,
    default: 0,
  },

  reminderSend: {
    type:Number,
    default: 0,
  },

  reminderOn: {
    type: Boolean, 
    default: true,
  },
  lastSyncedAt: {
    type: Date,
    default: null,
  },
},{timestamps: true});

const Student= mongoose.model('Student', studentSchema);
module.exports = Student;
