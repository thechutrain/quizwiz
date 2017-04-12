'user strict'
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username }).then((results, err) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'no user found with that username' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'incorrect password' })
      }
      // sanitize user
      return done(null, user)
    })
  }
))
