const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'  
},

function(email, password, done){
    //find a user and establish the identity
   User.findOne({ email: email })
  .then((user) => {
    if (!user || user.password !== password) {
      console.log('Invalid Username/Password');
      return Promise.reject(null);
    }
    return Promise.resolve(user);
  })
  .catch((err) => {
    console.log('Error in finding user --> Passport');
    return Promise.reject(err);
  })
  .then((user) => {
    // Use the user object here
    // Call the "done" function with the user or other appropriate value
    done(null, user);
  })
  .catch((err) => {
    // Handle any errors that occurred
    done(err);
  });

}
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserialize user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
  .then((user) => {
    if (!user) {
      console.log('User not found');
      return Promise.reject(null);
    }
    return Promise.resolve(user);
  })
  .catch((err) => {
    console.log('Error in finding user --> Passport');
    return Promise.reject(err);
  })
  .then((user) => {
    // Use the user object here
    // Call the "done" function with the user or other appropriate value
    done(null, user);
  })
  .catch((err) => {
    // Handle any errors that occurred
    done(err);
  });

});

// check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed in, then pass-on request to next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from current signed in session cookies and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;