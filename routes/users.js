const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model
const User = require('../models/User')
const Review=require('../models/Review')
const Course=require('../models/Course')
const Professor=require('../models/Professor')
var courses
const { ensureAuthenticated,forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 ,stud_id} = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 ||!stud_id) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      stud_id
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          stud_id
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          stud_id
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });``
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


//review a Course
router.get('/addReview', ensureAuthenticated,async (req, res) =>{
  //var query=Course.find().select('name')
  
  await Course.find({},'name', function(err,result){
    if(err)
    courses=['<no course found>']
    else
    courses=result
  })
  /*query.exec(function (err,course){
    if(err) 
    {}
    else
    courses=query
  }
  ) */ 
  res.render('addReview', {
    user: req.user,
    courses:courses
  })

});


router.post('/addReview', ensureAuthenticated,async(req,res)=>{
  var review1
var course_id
var course_rating
  let errors=[]
  var { course,rating1, rating2, rating3, rating4 ,rating5,net_rating,stud_id} = req.body;
  //validation
  if (!stud_id || !rating1 || !rating2 || !rating3 ||!rating4 || !rating5 || !net_rating) {
   // console.log("\n",course+rating1+rating2+rating3+rating4+rating5+net_rating+stud_id)
    errors.push({ msg: 'Please enter all fields' });
  }

var review1id;
  if (errors.length > 0) {
    res.render('addReview', {
      errors,user: req.user,
      stud_id,courses,rating1, rating2, rating3, rating4 ,rating5,net_rating
    });
  } else {

    console.log("\n",course+rating1+rating2+rating3+rating4+rating5+net_rating+stud_id)
    
         //get course._id
   
    student=req.user.name
    review1 = new Review()
     review1.rating1=rating1
     review1.rating2=rating2
     review1.rating3=rating3
     review1.rating4=rating4
     review1.rating5=rating5
     review1.net_rating=net_rating
     review1.student=student
     review1.course=course

    
    review1.save()
    
    review1id=review1._id;

  



  
   
    

     async function AddReviewToUser(){await User.findOneAndUpdate({ stud_id:stud_id  } ,{$addToSet:{Reviewed:review1id }} ,
        async function (err,result){
          if(err){
            errors.push({ msg: 'Cant find user id' })
            res.render('addReview', {
              errors,
              user: req.user,courses,student,rating1, rating2, rating3, rating4 ,rating5,net_rating
            });
          }

          else{

            req.flash(
              'success_msg',
              'Review added to user'
            );
           
          }
        });

      }
        
    var addReviewToUser= await AddReviewToUser()

 async function FindAllRatingOfCourse(){
  await Review.aggregate([

          {$match:{
            course:course
          }},
          {
            $group:{
    
              _id:null, 

             rating1_avg:{$avg:"$rating1"},
             rating2_avg:{$avg:"$rating2"},
           rating3_avg:{$avg:"$rating3"},
             rating4_avg:{$avg:"$rating4"},
             rating5_avg:{$avg:"$rating5"},
             net_rating_avg:{$avg:"$net_rating"},
              
    
            }
    
    
          }
    
    
  ], async function(err,result){
          if(err)
          {

          }
          else{
            console.log("\n",result)
          course_rating=result[0]
        console.log("course:",course_rating)
      }
        })
      }
var findAllRatingOfCourse=await FindAllRatingOfCourse()
console.log("\n",course_rating)


//update course
async function UpdateRatingOfCourse(){
  await Course.findOneAndUpdate({ name: course } ,{$addToSet:{Reviews:review1id },
    $set:{Rating1:course_rating.rating1_avg
    ,Rating2:course_rating.rating2_avg,
    Rating3:course_rating.rating3_avg,
    Rating4:course_rating.rating4_avg,
    Rating5:course_rating.rating5_avg,
    Net_Rating:course_rating.net_rating_avg
  }
    
    
    } ,
        async  function (err,result){
            if(err){
              errors.push({ msg: 'Cant find course' })
              Review.deleteOne({_id:review1id})
              res.render('addReview', {
                errors,
                user: req.user,courses,stud_id,rating1, rating2, rating3, rating4 ,rating5,net_rating
              });
            }
  
            else{
  
              req.flash(
                'success_msg',
                'Review added to course'
              );
              res.redirect('/dashboard');
            }
          });
      


        }   
        
        var updateRatingOfCourse=await UpdateRatingOfCourse()


      }
    





})

//add a Course

router.get('/addCourse', ensureAuthenticated, (req, res) =>{
  
  res.render('addCourse')

})



router.post('/addCourse',(req,res)=>{
  
  let errors=[]
  const { name,sem,desc,Faculty} = req.body;
  //validation
  if (!name || !sem || !desc || !Faculty ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  var Reviews_Count=0
  if (errors.length > 0) {
    res.render('addCourse', {
      errors,
      name,sem,desc,Faculty
    });
  } else {
    Rating1=0
    Rating2=0
    Rating3=0
    Rating4=0
    Rating5=0
    Net_Rating=0


    const course1 = new Course({
      name,sem,desc,Faculty,Rating1,Rating2,Rating3,Rating4,Rating5,Net_Rating
    });

/*
    

    



  */  
   


    course1.save()

    


            
    req.flash(
      'success_msg',
      'Course added'
    );
    res.redirect('/dashboard');



}
})


module.exports = router;
