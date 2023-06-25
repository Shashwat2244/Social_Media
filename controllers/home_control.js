const Post = require('../models/post');

module.exports.home = function(req,res){
   // return res.end('<h1> Express is up for Social Arcade! </h1>');
   // Post.find({}).then(posts => {
   //    res.render('home', {
   //       title: "SocioArcade | Home",
   //       posts: posts
   //    });
   // }).catch(err => {
   //    console.log(err);
   // });


   //Populate the user of each post
   Post.find({}).populate('user')
   .populate({
      path: 'comments',
      populate: {
         path: 'user'
      }
   })
   .exec()
   .then(posts => {
      console.log(posts);
      return res.render('home', {
         title: "SocioArcade | Home",
         posts: posts
      });
   }).catch(err => {
      console.log(err);
   });

}

//module.exports.actionName = function(req,res){}