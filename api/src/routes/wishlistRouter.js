const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// Ruta para agregar un producto a la wishlist de un usuario
router.post("/:userId/add", wishlistController.addToWishlist);

// Ruta para obtener la wishlist de un usuario
router.get("/:userId", wishlistController.getWishlist);

// Ruta para eliminar un producto de la wishlist de un usuario
router.delete('/:userId/products/:productId', wishlistController.removeProductFromWishlist);

// Ruta para editar la wishlist de un usuario (puedes usar un método PUT o PATCH según tu preferencia)
router.put('/:userId', wishlistController.editWishlist);

module.exports = router;
