const { Carrito, Product } = require("../db");


const mostrarCarrito = async (req, res) => {
  try {
    const { user } = req;

    const carrito = await Carrito.findOne({
      where: { userId: user.id },
      include: {
        model: Product,
        attributes: ["id", "name", "price"],
        through: { attributes: ["quantity"] },
      },
    });

    res.json({ carrito });
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al obtener el carrito" });
  }
};

const agregarProducto = async (req, res) => {
  try {
    const { user, body } = req;
    const { productId } = body;

 
    let carrito = await Carrito.findOne({ where: { userId: user.id } });

    /// Si no existe, crear un nuevo carrito para el usuario
    if (!carrito) {
      carrito = await Carrito.create({ userId: user.id });
    }

    //// verificamos si el producto ya esta en el carrito
    const productInCart = await carrito.hasProduct(productId);

    if (productInCart) {
      return res.status(400).json({ error: "El producto ya está en el carrito" });
    }

    await carrito.addProduct(productId);

    res.json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al agregar el producto al carrito" });
  }
};

const quitarProducto = async (req, res) => {
  try {
    const { user, params } = req;
    const { productId } = params;

    // Buscar el carrito del usuario actual
    const carrito = await Carrito.findOne({ where: { userId: user.id } });

    if (!carrito) {
      return res.status(404).json({ error: "El carrito no existe" });
    }

    await carrito.removeProduct(productId);

    res.json({ message: "Producto removido del carrito exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al quitar el producto del carrito" });
  }
};

module.exports = {
  mostrarCarrito,
  agregarProducto,
  quitarProducto
};
