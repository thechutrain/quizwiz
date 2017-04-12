'user strict'
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

module.exports = function (passport, User) {

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
            console.log(newUser)
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

  // passport.use()

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
