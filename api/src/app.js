const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mainRouter = require("./routes/index.js");
const cors = require("cors");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const{User} = require("./db")
const session = require("express-session");

require("./db.js");

const server = express();

server.name = "API";

// Configure Passport
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
          where: { googleId: profile.id }, // Use the id field instead of googleId
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

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use(session({
  secret: "shnawg is not paying the bills",
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
server.use(passport.initialize());


// Configurar opciones de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the exact origin of your application
  credentials: true,
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

server.use(cors(corsOptions));

server.use(mainRouter);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
