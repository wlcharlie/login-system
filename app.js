const express = require('express')
const expressSession = require('express-session')
const exphbs = require('express-handlebars')
const users = require('./models/users')
const loginVerify = require('./loginVerify')

const app = express()
const port = 4000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(expressSession({
  secret: "meowmeowhss",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30000 }

}))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  console.log(req.session)
  console.log(req.sessionID)
  if (req.session.loginUser) {
    res.redirect('/welcome')
  } else {
    res.render('index')
  }
})

app.post('/', (req, res) => {
  const loginStatus = loginVerify(req.body).loginStatus
  const loginError = loginVerify(req.body).loginError

  if (loginStatus) {
    const loginUser = loginVerify(req.body).loginUser
    req.session.loginUser = loginUser
    res.redirect('/welcome')
  } else {
    res.render('index', { loginError })
  }
})

app.get('/welcome', (req, res) => {
  if (req.session.loginUser) {
    res.render('welcome', { loginUser: req.session.loginUser })
  } else {
    res.redirect('/')
  }
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})