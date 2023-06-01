const { createProducts } = require("../controllers/productosContollers");


const createProductsHandlres = async (req, res) => {
    const { nombre, descripcion, imagen,cantidad, precio } = req.body;
  
    try {
      const response = await createProducts(nombre, descripcion, imagen,cantidad, precio);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    // getAllRatingsHandlres,
    // getRatingByIdHandlres,
    createProductsHandlres,
    // updateRatingHandlres,
    // deleteRatingHandlres,
  };