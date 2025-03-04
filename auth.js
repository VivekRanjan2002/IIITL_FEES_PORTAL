const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

// const PORT = process.env.PORT || "http://localhost:5000";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `https://iiitl-fee-portal.onrender.com/auth/google/callback`,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      if (profile._json.hd === "iiitl.ac.in") {
        // find or create user in database, etc
        done(null, profile);
        // User.find({ id: profile.id }).done(done);
      } else {
        // failb
        done(new Error("Use college ID"));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
