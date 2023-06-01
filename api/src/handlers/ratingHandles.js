const {
  getAllRatings,
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratingController");

const getAllRatingsHandlres = async (req, res) => {
  try {
    const response = await getAllRatings();
    return res.status(200).send(response);
  } catch (error) {
    return res.status(404).json({ error: "rating not found" });
  }
};

const getRatingByIdHandlres = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getRatingById(id);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "rating not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while getting the rating" });
  }
};

const createRatingHandlres = async (req, res) => {
  const { valor, fecha, comentario, productoId, userId } = req.body;

  try {
    const response = await createRating(
      valor,
      fecha,
      comentario,
      productoId,
      userId
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRatingHandlres = async (req, res) => {
  const { id } = req.params;
  const { valor } = req.body;

  const response = await updateRating( id, valor )
  if (response) {
    response.valor = valor;   
    await response.save();
    res.status(200).json(response);
  } else {
    res.status(404).json({ error: 'Calificación no encontrada' });
  }
  


};

const deleteRatingHandlres = async (req, res) => {

  res.status(200).send("aqui vamos GET ID");
};

module.exports = {
  getAllRatingsHandlres,
  getRatingByIdHandlres,
  createRatingHandlres,
  updateRatingHandlres,
  deleteRatingHandlres,
};
