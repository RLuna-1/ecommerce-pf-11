const { User } = require("../db");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "shnawg is not paying the bills", {
    expiresIn: maxAge,
  });
};

const getSignUp = () => {};

const getLogIn = () => {};

const postSignUp = async ( email, password) => {
  const newSignUp = await User.create({

    email: email,
    password: password,
    createdInBd: false,
  });
  const token = createToken(newSignUp._id);
  return { newSignUp, token };
};

const postLogIn = async (email, password) => {
  const newLogIn = await User.login(email, password);

  const token = createToken(newLogIn._id);

  return { newLogIn, token };
};

const getLogOut = () => {
    
};

module.exports = { getSignUp, getLogIn, postSignUp, postLogIn, getLogOut };
