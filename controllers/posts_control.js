const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(post => {
        return res.redirect('back');
    }).catch(err => {
        console.log('error in creating a post');
    });    

//      Post.create(
//     {
//       content: req.body.content,
//       user: req.user._id
//     },
//     function(err, post) {
//       if (err) {
//         console.log('error in creating a post');
//         return;
//       }

//       // Create a comment associated with the post
//       Comment.create(
//         {
//           content: req.body.comment,
//           post: post._id,
//           user: req.user._id
//         },
//         function(err, comment) {
//           if (err) {
//             console.log('error in creating a comment');
//             return;
//           }

//           // Push the comment's ID to the comments array of the post
//           post.comments.push(comment._id);
//           post.save();

//           return res.redirect('back');
//         }
//       );
//     }
//   );
}

module.exports.destroy = async function(req, res){
  

//     Post.findById(req.params.id)
//   .then(post => {
//     if (post.user == req.user.id) {
//       post.remove();

//       return Comment.deleteMany({ post: req.params.id }).catch(err =>
//       {
//         res.redirect('back');
//       });
//     } else {
//       throw new Error('Unauthorized');
//     }
//   })
//   .catch(err => {
//     res.redirect('back');
//   });

  const post = await Post.findById(req.params.id);
  if (post.user == req.user.id) {
    await Post.deleteOne({_id: post._id});
    await Comment.deleteMany({post: req.params.id});
    return res.redirect('back');
  } else {
    return res.redirect('back');
  }
}