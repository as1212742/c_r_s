const mocha=require('mocha');
const assert=require('assert');
var mongoose = require('mongoose');


const Course=require('../models/Course');
const Professor=require('../models/Professor');
const Review=require('../models/Review');
const User=require('../models/User');



describe('Database Tests', function() {

    //Before starting the test, create a database connection
    //Once a connection is established invoke done()
    before(function (done) {
      mongoose.connect('mongodb+srv://admin:'+ encodeURIComponent('admin') + '@coursereview-bwcik.mongodb.net/test?retryWrites=true');
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function() {
        console.log('We are connected to database succesfully!');
        done();
      });
    });



describe('saving records',function(){

    it('Saves course to database course',function(done){
      
        var char=new Course({
            name:'CS',
        });
        
        char.save().then(function(){
            assert(char.isNew === false);
            done();
        });
    });


   
    it('Should retrieve data from test database', function(done) {
        //Look up the 'Mike' object previously saved.
        Course.find({name: 'CS'}, (err, name) => {
          if(err) {throw err;}
          if(name.length === 0) {throw new Error('No data!');}
          done();
        });
      });  

      it('removes the data from database', (done) => {
        Course.remove()
          .then(() => Course.findOne({ name: 'CS' }))
          .then((Course) => {
            assert(Course === null);
            done();
          });
      });
});

});