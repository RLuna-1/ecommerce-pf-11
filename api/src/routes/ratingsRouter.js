const { Router } = require("express");
const {
  getAllRatingsHandlres,
  getRatingByIdHandlres,
  createRatingHandlres,
  updateRatingHandlres,
  deleteRatingHandlres,
} = require("../handlers/ratingHandles");

const ratingsRouter = Router();

ratingsRouter.get("/", getAllRatingsHandlres);

ratingsRouter.get("/:id", getRatingByIdHandlres);

ratingsRouter.post("/", createRatingHandlres);

ratingsRouter.put("/:id", updateRatingHandlres);

ratingsRouter.delete("/:id", deleteRatingHandlres);

module.exports = ratingsRouter;
