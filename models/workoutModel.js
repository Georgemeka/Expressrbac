/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');


const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A workout must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A workout name must be less than or equal to 40 characters'],
    minlength: [10, 'A workout name must be greater than or equal to 10 characters']
  },

  duration: {
    type: Number,
    required: [true, 'A workout must have a duration'],
  },

  repetiions: {
    type: Number,
    required: [true, 'A workout must have a rep number']
  },
 

  difficulty: {
    type: String,
    required: [true, 'A workout must have a difficulty'],
    enum: {
      values: ['easy', 'difficult', 'medium'],
      message: 'Difficulty is either easy, medium or difficult'
    }
  },

});






const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
