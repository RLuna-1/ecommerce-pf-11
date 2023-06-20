const express = require("express");
const carritoRouter = express.Router();
const {
    mostrarCarrito,
    agregarProducto,
    quitarProducto
  } = require("../controllers/carritoController");
const {requireAuth} = require("../utils/index");


carritoRouter.get("/", requireAuth, mostrarCarrito);

carritoRouter.post("/", requireAuth, agregarProducto);

carritoRouter.delete("/:productId", requireAuth, quitarProducto);

module.exports = carritoRouter;