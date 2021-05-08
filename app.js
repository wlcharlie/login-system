const express = require('express')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const users = require('./models/users')
const loginVerify = require('./loginVerify')

const app = express()
const port = 4000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(cookieParser('55688'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  if (Object.keys(req.signedCookies).length) {
    res.redirect('/welcome')
  } else {
    res.render('index')
  }
})

app.post('/', (req, res) => {
  const loginStatus = loginVerify(req.body).loginStatus
  const loginUser = loginVerify(req.body).loginUser
  const loginError = loginVerify(req.body).loginError

  if (loginStatus) {
    res.clearCookie('firstName')
    res.cookie('firstName', loginUser, { signed: true, maxAge: 30000 })
    res.redirect('/welcome')
  } else {
    res.render('index', { loginError })
  }
})

app.get('/welcome', (req, res) => {
  if (Object.keys(req.signedCookies).length) {
    const loginUser = req.signedCookies.firstName
    res.render('welcome', { loginUser })
  } else {
    res.redirect('/')
  }
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})