const { Router } = require("express");
const transactionsRouter = Router();

transactionsRouter.get("/", (req, res) => {
  res.status(200).send("aqui vamos GET");
});

transactionsRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

transactionsRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

transactionsRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

transactionsRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = transactionsRouter;