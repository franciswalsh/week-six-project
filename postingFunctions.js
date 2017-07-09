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

function updateLikesTable(req){
  let postid = req.params.id;
  let userid = req.session.userid;
  const newLike = models.Likes.build({
    postid: postid,
    userid: userid
  })
  console.log(newLike);
  newLike.save();
}

function countingLikes(req, posts){
  for (let i = 0; i < posts.length; i++){
    models.Likes.count({
      where: {
        postid: posts[i].id
      }
    }).then(function(count){
      models.Posts.update({numberoflikes: count}, {where: {id: posts[i].id}}).then(function(){
        console.log("going through the loop");
      })
    })
  }
}

module.exports = {
  addPostToPostsTable: addPostToPostsTable,
  updateLikesTable: updateLikesTable,
  countingLikes: countingLikes
}
