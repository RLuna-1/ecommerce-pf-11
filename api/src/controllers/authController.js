const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { revokeAllTokens } = require("passport-google-oauth2");
const passport = require("passport");

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
    is_verified: false,
  });

  const token = createToken(newSignUp.id);
  return { newSignUp, token };
};

const postLogIn = async (email, password) => {
  const newLogIn = await User.login(email, password);

  const token = createToken(newLogIn.id);

  return { newLogIn, token };
};

const googleAuthToken = async (user, revoke) => {
  if (revoke) {
    await user.revokeAllTokens(user.googleId);
    return null;
  }

  const token = createToken(user.id);
  return token;
};

const userVerification = async (email, verification_code) => {
  const verification = await User.verify(email, verification_code);

  return verification;
};

const getUserByToken = async (decodedToken) => {
  try {
    let user;

    user = await User.findByPk(decodedToken.id);

    if (user === undefined || user === null) {
      user = await User.findByPk(decodedToken.googleId);
      console.log("Tried with googleId");
    }
    return user;
  } catch (error) {
    throw new Error("Error retrieving user");
  }
};

const getLogOut = () => {};

module.exports = {
  getSignUp,
  getLogIn,
  postSignUp,
  postLogIn,
  getLogOut,
  googleAuthToken,
  userVerification,
  getUserByToken,
};
