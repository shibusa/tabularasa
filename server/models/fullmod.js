var mongoose = require('mongoose');
var loginSchema = new mongoose.Schema(
{
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }]
},
  {timestamps: true}
)

var qSchema = new mongoose.Schema(
{
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: String,
    unique: true,
    minlength: 10,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }]
},
  {timestamps: true}
)

var aSchema = new mongoose.Schema(
{
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  _question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: {
    type: String,
    unique: true,
    minlength: 5,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  likes: {
    type: Number,
    required: true
  }
},
  {timestamps: true}
)

mongoose.model('User', loginSchema)
mongoose.model('Question', qSchema)
mongoose.model('Answer', aSchema)
console.log("Full model loaded")
