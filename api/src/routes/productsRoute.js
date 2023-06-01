const { Router } = require("express");
const { createProductsHandlres } = require("../handlers/productsHandlers");

const productsRouter = Router();

productsRouter.get("/", (req,res)=>{
  res.status(200).send('aqui vamos bien con los products')
  });
  productsRouter.get("/:id", (req, res) => {
    res.status(200).send("aqui vamos GET ID");
  });
  
  productsRouter.post("/", createProductsHandlres);
  
  productsRouter.put("/:id", (req, res) => {
    res.status(200).send("aqui vamos PUT");
  });
  
  productsRouter.delete("/:id", (req, res) => {
    res.status(200).send("aqui vamos DELETE");
  });
module.exports = productsRouter;
