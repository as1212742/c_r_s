module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  },
  ensureadminAuthenticated: function(req,res,next){
if(req.isAuthenticated()){
  if(req.user.name=="admin")
  {
    return next();
  }}
  req.flash('error_msg', 'Only admin can view that resource');
    res.redirect('/users/login');


  }
};
