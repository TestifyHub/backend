const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userSchema = require("../models/UserSchema");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userSchema.findOne({ googleId: profile.id });

        if (!user) {
          user = await userSchema.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            profilePicUrl: profile._json.picture,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userSchema.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
