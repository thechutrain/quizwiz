'user strict'
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

module.exports = function (passport, User) {
  passport.serializeUser((user, done) => {
    done(null, user.dataValues.id)
  })

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
    .then((user) => {
      let cleanUser = Object.assign({}, user.dataValues)
      delete cleanUser.password
      done(null, cleanUser)
    })
  })

  passport.use('local-register',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, username, password, done) => {
      function hashPassword (inputPassword) {
        let saltRounds = 10
        return bcrypt.hash(inputPassword, saltRounds)
      }
      User.findOne({
        where: { username }
      })
      .then((user) => {
        if (user) {
          console.log(`The username "${username}" is taken`)
          return done(null, false, { message: `The username "${username}" is taken` })
        }
        hashPassword(password).then((hashed) => {
          let data = {
            username,
            password: hashed
          }
          User.create(data).then((newUser) => {
            // console.log(newUser)
            if (newUser) {
              done(null, newUser)
            } else {
              done(null, false)
            }
          }).catch((err) => done(err))
        })
      })
    })
  ) // ends local-login

  passport.use('local-login',
    new LocalStrategy((username, password, done) => {
      function isValidPassword (passInput, passStored) {
        return bcrypt.compareSync(passInput, passStored)
      }
      User.findOne({
        where: { username }
      })
      .then((userResult) => {
        if (!userResult) {
          console.log(`No user name of "${username}" found`)
          return done(null, false, {message: `No user name of "${username}" found`})
        }
        if (!isValidPassword(password, userResult.password)) {
          console.log(`passwords do not match for "${username}"`)
          return done(null, false, {message: `passwords do not match for "${username}"`})
        }
        done(null, userResult)
      })
    })
  )
}
