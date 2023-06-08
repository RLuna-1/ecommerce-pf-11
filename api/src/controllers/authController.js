const { User } = require("../db");
const jwt = require("jsonwebtoken");
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const [user] = await User.findOrCreate({
          where: { id: profile.id }, // Use the id field instead of googleId
          defaults: {
            name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.email,
            password: "", // Set a default value or leave it empty if not required
          },
        });
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "shnawg is not paying the bills", {
    expiresIn: maxAge,
  });
};

const getSignUp = () => {};

const getLogIn = () => {};

const postSignUp = async (name, last_name, email, password, phone) => {
  const newSignUp = await User.create({
    name: name,
    last_name: last_name,
    email: email,
    password: password,
    createdInBd: false,
    phone: phone,
  });

  const token = createToken(newSignUp._id);
  return { newSignUp, token };
};

const postLogIn = async (email, password) => {
  const newLogIn = await User.login(email, password);

  const token = createToken(newLogIn._id);

  return { newLogIn, token };
};

const getLogOut = () => {};

module.exports = { getSignUp, getLogIn, postSignUp, postLogIn, getLogOut };
