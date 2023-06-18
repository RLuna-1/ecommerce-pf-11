const { Router } = require("express");
const {
  getReviews,
  getReviewDetail,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsController");
const reviewsRouter = Router();

reviewsRouter.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .json(
        await getReviews(
          req.query.name,
          req.query.rating,
          req.query.ratingte,
          req.query.ratinglte,
          req.query.description,
          req.query.createdAt,
          req.query.productId,
          req.query.userId,
          req.query.deleted,
          req.query.order,
          req.query.direction, req.query.deleted
        )
      );
  } catch (error) {
    res.status(400).json(error.message);
  }
});

reviewsRouter.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await getReviewDetail(req.params.id));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

reviewsRouter.post("/", async (req, res) => {
  try {
    res
      .status(200)
      .json(
        await createReview(
          req.body.name,
          req.body.rating,
          req.body.description,
          req.body.productId,
          req.body.userId
        )
      );
  } catch (error) {
    res.status(400).json(await error.message);
  }
});

reviewsRouter.put("/:id", async (req, res) => {
  try {
    res.status(200).json(await updateReview(req.params.id, req.body.name, req.body.rating, req.body.description))
  } catch (error) {
    res.status(400).json(await error.message)
  }
});

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    res.status(200).json(await deleteReview(req.params.id))
  } catch (error) {
    res.status(400).json(await error.message)
  };
});

module.exports = reviewsRouter;
