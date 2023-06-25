const User = require("../models/user");

// module.exports.profile = function(req,res){
//     // res.end('<h1>User Profile</h1>');
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id)
//   .then((user) => {
//     if (user) {
//       return res.render('users', {
//         title: "User Profile",
//         profile_user: user
//       });
//     }
//   })
//   .catch((err) => {
//     console.log('Error in finding user by ID');
//   });

//     }
//     else{
//  return res.redirect('/users/sign-in');
//     }
   
// }


module.exports.profile=function(req, res){
    //return res.end("<h1> user profile has been viewed </h1>")

    User.findById(req.params.id)
  .then(user => {
    return res.render("users", {
      title: "User profile",
      profile_user: user
    });
  })
  .catch(err => {
    // Handle error
  });

  }

module.exports.update = function(req,res){
  if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body).then(user => {
      return res.redirect('back');
    }).catch(err => {
      console.log(err);
    });
  }else{
    return res.status(401).send('Unauthorized');
  }
 
}


// Rendered the Sign Up Page
module.exports.signup = function(req,res){
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }
    return res.render('user_signup',{
        title: "Social Arcade | Sign Up"
    });
}

// Rendered the Sign In Page
module.exports.signin = function(req,res){
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }
    return res.render('user_signin',{
        title: "Social Arcade | Sign In"
    });
}

//Get the Sign Up Data
// module.exports.create = function(req, res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }
    
// User.findOne({ email: req.body.email })
//   .then((user) => {
//     if (!user) {
//       return User.create(req.body);
//     } else {
//       throw new Error('User already exists');
//     }
//   })
//   .then((user) => {
//     return res.redirect('/users/sign-in');
//   })
//   .catch((error) => {
//     console.log(error);
//     return res.redirect('back');
//   });


module.exports.create =async function(req,res){
    try {
        // console.log('in try block')
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        let user =await User.findOne({email: req.body.email});
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('error in sih=gn up', error);
        return;
    }
    
}

// }

// Sign in and Create a session for the user
module.exports.createSession = function(req, res){
    // Find User
    return res.redirect('/');

}

// module.exports.destroySession=function(req, res)
// {
//    // req.logout();
//    return res.redirect("/");

// }

module.exports.destroySession = function(req, res){
   req.logout(function(err) {
      if (err) { console.log(err); return ; }
      res.redirect('/');
    });

   // return res.redirect('/');
}
