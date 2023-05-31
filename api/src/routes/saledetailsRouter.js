const { Router } = require("express");
const saledetailsRouter = Router();

saledetailsRouter.get("/", (req, res) => {
  res.status(200).send("aqui vamos GET");
});

saledetailsRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

saledetailsRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

saledetailsRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

saledetailsRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = saledetailsRouter;