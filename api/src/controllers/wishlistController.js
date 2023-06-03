const { Wishlist, User, Product } = require("../db");

// Controlador para agregar un producto a la wishlist de un usuario
async function addToWishlist(req, res) {
  const { userId, productId } = req.body;

  try {
    // Verificar si el usuario y el producto existen
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "Usuario o producto no encontrado" });
    }

    // Verificar si el usuario ya tiene una wishlist
    let wishlist = await Wishlist.findOne({
      where: { UserId: userId },
    });

    if (!wishlist) {
      // Si el usuario no tiene una wishlist, crear una nueva
      wishlist = await Wishlist.create({
        UserId: userId,
      });
    }

    // Agregar el producto a la wishlist
    await wishlist.addProduct(productId);

    return res.status(200).json({ message: "Producto agregado a la wishlist" });
  } catch (error) {
    console.error("Error al agregar producto a la wishlist:", error);
    return res.status(500).json({ message: "Error al agregar producto a la wishlist" });
  }
}

// Controlador para obtener la wishlist de un usuario
async function getWishlist(req, res) {
  const { userId } = req.params;

  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener la wishlist del usuario
    const wishlist = await Wishlist.findOne({
      where: { UserId: userId },
      include: [Product], // Incluir los productos asociados a la wishlist
    });

    if (!wishlist) {
      return res.status(200).json({ message: "El usuario no tiene una wishlist" });
    }

    return res.status(200).json({ wishlist });
  } catch (error) {
    console.error("Error al obtener la wishlist:", error);
    return res.status(500).json({ message: "Error al obtener la wishlist" });
  }
}


async function removeProductFromWishlist(req, res) {
  const { userId, productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({
      where: { userId },
    });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    await wishlist.removeProduct(productId);

    return res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


async function editWishlist(req, res) {
  const { userId } = req.params;
  const { productIds } = req.body;

  try {
    const wishlist = await Wishlist.findOne({
      where: { userId },
    });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    
    await wishlist.setProducts(productIds);

    return res.status(200).json({ message: 'Wishlist updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  addToWishlist,
  getWishlist,
  removeProductFromWishlist,
  editWishlist,
};
