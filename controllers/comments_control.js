const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function(req, res){
    Post.findById(req.body.post).then(function(post){
        if(post){
            return Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then(function(comment){
        post.comments.push(comment);
        return post.save();
    }).then(function(){
        res.redirect('/');
    }).catch(function(err){
        console.log(err);
    });
        }else{
            throw new Error('Post not found');
        }
    })
}




module.exports.destroy = async function(req, res) {
 const comment = await Comment.findById(req.params.id);
 if(comment.user == req.user.id){
    await comment.deleteOne({_id: comment._id});
    await Post.findByIdAndUpdate(comment.post, {$pull: {
        comments: req.params.id
    }});
    return res.redirect('back');
 }else{
    return res.redirect('back');
 }

}




    // Comment.findById(req.params.id, function(err, comment){
    //     if(comment.user == req.user.id){
    //         let postId = comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
    //             return res.redirect('back');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
