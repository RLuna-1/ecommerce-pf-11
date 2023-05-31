const { Router } = require("express");
const wishlistsRouter = Router();

wishlistsRouter.get("/", (req, res) => {
  res.status(200).send("aqui vamos GET");
});

wishlistsRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

wishlistsRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

wishlistsRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

wishlistsRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = wishlistsRouter;