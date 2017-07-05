const models = require("./models");

// function gettingUserId(req){
//
// }

function addPostToPostsTable(req){
  let postContent = req.body.newPost
  const newPost = models.Posts.build({
    postcontent: postContent,
    numberoflikes: 0,
    userid: req.session.userid,
    username: req.session.username
  })
  newPost.save();
}



module.exports = {
  addPostToPostsTable: addPostToPostsTable
}
