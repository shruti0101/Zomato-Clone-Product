const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport = require('passport');

const GOOGLE_CLIENT_ID = "582609431071-b61thlvau91pceqe4suh955g1ecfu6mb.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
 
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});