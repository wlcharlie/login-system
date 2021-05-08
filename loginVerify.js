const users = require('./models/users')

function loginVerify(currentLoginReq) {
  const reqEmail = currentLoginReq.email
  const reqPassword = currentLoginReq.password

  for (let i = 0; i < users.length; i++) {
    if ((users[i].email === reqEmail) && (users[i].password === reqPassword)) {
      return {
        loginStatus: true,
        loginUser: users[i].firstName,
      }
    }
  }

  return {
    loginError: true
  }
}

module.exports = loginVerify