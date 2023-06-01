const { Router } = require("express");

const productsRouter = Router();

productsRouter.get("/", (req,res)=>{
  res.status(200).send('aqui vamos bien con los products')
  });
  productsRouter.get("/:id", (req, res) => {
    res.status(200).send("aqui vamos GET ID");
  });
  
  productsRouter.post("/", (req, res) => {
    res.status(200).send("aqui vamos POST");
  });
  
  productsRouter.put("/:id", (req, res) => {
    res.status(200).send("aqui vamos PUT");
  });
  
  productsRouter.delete("/:id", (req, res) => {
    res.status(200).send("aqui vamos DELETE");
  });
module.exports = productsRouter;
