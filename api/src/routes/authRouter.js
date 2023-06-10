const { Router } = require("express");
const {
  getSignUp,
  getLogIn,
  postSignUp,
  postLogIn,
  getLogOut,
  googleAuthToken,
} = require("../controllers/authController");

const passport = require("passport");

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, last_name, email, password, phone } = req.body;

  try {
    const { newSignUp, token } = await postSignUp(
      name,
      last_name,
      email,
      password,
      phone
    );

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
    if (req.user && req.user.googleId) {
      req.logout(); 
      res.status(200).json("Google user logged out succesfully")
      // No estoy seguro si esto funciona
    }

    res.clearCookie("jwt");
    res.status(200).json("User logged out successfully");
  } catch (error) {
    res.status(400).json(`Error while logging out the user: ${error.message}`);
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/google",
    session: false,
  }),
  async (req, res) => {
    try {
      const token = await googleAuthToken(req.user);
      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(500).json({ error: "Authentication failed" });
    }
  }
);

module.exports = authRouter;
