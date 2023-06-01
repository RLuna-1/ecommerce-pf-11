const { Router } = require("express");
const paymentsRouter = Router();

paymentsRouter.get("/", (req, res) => {
  res.status(200).send("aqui vamos GET");
});

paymentsRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

paymentsRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

paymentsRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

paymentsRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = paymentsRouter;