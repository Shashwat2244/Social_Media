module.exports.content = function(req,res){
    // res.end('<h1>Post Content</h1>');
    return res.render('posts',{
        title: 'Home'
    });
}