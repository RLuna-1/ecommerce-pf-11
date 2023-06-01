const { Router } = require("express");
const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.status(200).send("aqui vamos GET");
});

usersRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

usersRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

usersRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

usersRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = usersRouter;
