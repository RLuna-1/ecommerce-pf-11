const { Router } = require("express");
const categoriesRouter = Router();

categoriesRouter.get("/", (req, res) => {
  res.status(200).send("aqui vamos GET");
});

categoriesRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

categoriesRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

categoriesRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

categoriesRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = categoriesRouter;