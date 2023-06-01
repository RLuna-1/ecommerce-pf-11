const { Producto } = require("../db");

const createProducts = async (nombre, descripcion, imagen,cantidad, precio) => {
    const newRating = await Producto.create({nombre, descripcion, imagen,cantidad, precio});
   
   
   return newRating
  }
  
  module.exports = {
    createProducts
    // getRatingByIdHandlres,
    // createRatingHandlres,
    // updateRatingHandlres,
    // deleteRatingHandlres,
  };