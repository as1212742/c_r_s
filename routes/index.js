const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Course=require('../models/Course')
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) =>{
  //update this populate
 // courses=[dm,spe]
  // courses=Course.find().populate({path:"Reviews",populate:{path:"Student"}})
   course=await Course.find()
    res.render('dashboard', {
      user:req.user,
      courses:course
    })}
  );
  

module.exports = router;
