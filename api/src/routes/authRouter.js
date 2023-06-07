const { Router } = require("express");
const {
  getSignUp,
  getLogIn,
  postSignUp,
  postLogIn,
  getLogOut,
} = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {

  const { email, password } = req.body;

  try {
    const { newSignUp, token } = await postSignUp( email, password);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 3 * 24 * 60 * 60,
    });
    res.status(201).json(`User ${newSignUp.email} created succesfully`);

  } catch (error) {
    res.status(400).json(`Failed to create user: ${error.message}`);
  }
});

authRouter.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {
    const { newLogIn, token } = await postLogIn(email, password);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 3 * 24 * 60 * 60,
    });


    res.status(201).json(`User ${newLogIn.email} logged in succesfully`);

  } catch (error) {
    res.status(400).json(`Failed to log in the user: ${error.message}`);
  }
});

authRouter.get("/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json(`User logged out succesfully`);
  } catch (error) {
    res.status(400).json(`Error while logging out the user: ${error.message}`);
  }
});

module.exports = authRouter;
