const { Router } = require("express");
const ratingsRouter = Router();

ratingsRouter.get("/", (req, res) => {
  res.status(200).send("aqui vamos GET");
});

ratingsRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

ratingsRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

ratingsRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

ratingsRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = ratingsRouter;