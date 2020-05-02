const mongoose = require('mongoose');

const Schema=mongoose.Schema
const Review=require('../models/Review')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
 
stud_id:
{
    type:String,
    required:true
},

enrolled_in:{
    type:String

}
,

Reviewed:[{type:Schema.ObjectId,
  ref:"Review"

}]

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
