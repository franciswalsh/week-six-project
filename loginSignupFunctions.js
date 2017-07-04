const models = require("./models");

function confirmPassword(req){
  let password = req.body.passwordInputSignup;
  let confirmPassword = req.body.confirmPasswordInputSignup;

  if (password === confirmPassword){
    return true;
  } else {
    return false;
  }
}
function addUserToUsersTable(req){
  if (confirmPassword(req)){
    let username = req.body.usernameInputSignup;
    let password = req.body.passwordInputSignup;
    const newUser = models.Users.build({
      username: username,
      password: password,
      displayname: username
    })
    newUser.save();
  }
};
function loginUsernameSuccess(req){
  let username = req.body.usernameInputLogin;
  let password = req.body.passwordInputLogin;
  models.Users.findOne({
    where: {
      username: username,
      password: password
    }
  }).then(function(user){
    req.session.authenticated = true;
  })
};

module.exports = {
  confirmPassword: confirmPassword,
  addUserToUsersTable: addUserToUsersTable,
  loginUsernameSuccess: loginUsernameSuccess
}
