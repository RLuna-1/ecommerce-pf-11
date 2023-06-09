const express = require("express");
const carritoRouter = express.Router();
const {
    mostrarCarrito,
    agregarProducto,
    quitarProducto
  } = require("../controllers/carritoController");
const authMiddleware = require("../utils/index");


carritoRouter.get("/", authMiddleware, mostrarCarrito);

carritoRouter.post("/", authMiddleware, agregarProducto);

carritoRouter.delete("/:productId", authMiddleware, quitarProducto);

module.exports = router;
