const { RatingProducto } = require("../db");

const getAllRatings = async () =>{
return await RatingProducto.findAll()
}  

const getRatingById = async ( id ) => {
  console.log(id);
  const rating = await RatingProducto.findByPk(id);
  return rating
}

const createRating = async (valor, fecha, comentario) => {
  return await RatingProducto.create({valor,fecha,comentario});

}

const updateRating = async (id, score) => {
  return rating = await RatingProducto.findByPk(id);
   
};

const deleteRating = async (name) => {};
module.exports = {
  getAllRatings,
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
};
