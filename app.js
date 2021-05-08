const express = require('express')
const exphbs = require('express-handlebars')
const users = require('./models/users')
const loginVerify = require('./loginVerify')

const app = express()
const port = 4000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const loginStatus = loginVerify(req.body).loginStatus
  const loginUser = loginVerify(req.body).loginUser
  const loginError = loginVerify(req.body).loginError

  if (loginStatus) {
    res.render('welcome', { loginUser })
  } else {
    res.render('index', { loginError })
  }

})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})