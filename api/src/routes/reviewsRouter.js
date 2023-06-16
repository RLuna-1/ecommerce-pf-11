const { Router } = require("express");
const { getReviews } = require("../controllers/reviewsController");
const reviewsRouter = Router();

reviewsRouter.get("/", async (req, res) => {
  try {
    res.status(200).json(await getReviews(req.query.name,
      req.query.rating,
      req.query.ratingte,
      req.query.ratinglte,
      req.query.description,
      req.query.createdAt,
      req.query.productId,
      req.query.userId,
      req.query.deleted, req.query.order, req.query.direction));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

reviewsRouter.get("/:id", (req, res) => {
  res.status(200).send("aqui vamos GET ID");
});

reviewsRouter.post("/", (req, res) => {
  res.status(200).send("aqui vamos POST");
});

reviewsRouter.put("/:id", (req, res) => {
  res.status(200).send("aqui vamos PUT");
});

reviewsRouter.delete("/:id", (req, res) => {
  res.status(200).send("aqui vamos DELETE");
});

module.exports = reviewsRouter;
