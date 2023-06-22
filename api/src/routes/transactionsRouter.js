const { Router } = require("express");
const transactionsRouter = Router();
const {
  getAllTransacciones
} = require("../controllers/transaccionController");

transactionsRouter.get("/", (req, res) => {
  const transacciones = getAllTransacciones()
  res.status(200).send(transacciones);
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