const { Router } = require("express");
const salesRouter = Router();

salesRouter.get("/", (req, res) => {
  res.status(200).send("aqui vamos GET");
});

salesRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

salesRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

salesRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

salesRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = salesRouter;