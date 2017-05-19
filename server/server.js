// App dependencies ---------------------------- /
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').load()
// const session = require('express-session')
// const errorHandler = require('./controllers/middleware/errorHandler')

const db = require('./db/models')
// const apiRouter = require('./controllers/apiRouter')
// const errorHandler = require('./controllers/middleware/errorHandler')
// const passport = require('passport')
// require('./config/passport')(passport, db.user)

// DEVELOPMENT ONLY ------------------------- /
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

// Create express App ------------------------- /
const app = express() // for testing purposes
app.disable('x-powered-by')
const PORT = process.env.PORT || 3000

// Logger ------------------------- /
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')) // for logging

// App middleware ------------------------------ /
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(session({
//   secret: process.env.APP_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: true,
//     maxAge: 6 * 1000 * 1000 * 1000 * 1000
//   }
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// Route config -------------------------------------------/
// app.use('/api/v2', apiRouter)
app.use('/api/v2/user', require('./controllers/api/userRouter'))
app.use('/api/v2/quiz', require('./controllers/api/quizRouter'))
app.use('/api/v2/vote', require('./controllers/api/voteRouter'))
// app.use(errorHandler)

// Start server ---------------------------------- /
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'travisTest') {
  db.sequelize.sync().then(() => {
    console.info('Databases are all synced!')
    app.listen(PORT, (err) => {
      if (err) console.log(err)
      console.info(`${process.env.NODE_ENV} ENV: Listening on port: ${PORT}`)
    })
  }).catch((err) => console.error(err))
}
// else {
//   // console.log('THIS IS A TEST')
//   app.listen(PORT, (err) => {
//     if (err) console.log(err)
//     console.info(`Listening on port: ${PORT}`)
//   })
// }
module.exports = app
