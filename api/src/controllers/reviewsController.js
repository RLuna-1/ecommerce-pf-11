const { User, Review, Product } = require("../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getReviews = (
  name,
  rating,
  ratinggte,
  ratinglte,
  description,
  createdAt,
  productId,
  userId,
  deleted,
  order,
  direction,
) => {
  const whereClause = {};
  const orderClause = [];

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (ratinggte && ratinglte) {
    whereClause.rating = {
      [Op.between]: [ratinggte, ratinglte],
    };
  } else if (ratinggte) {
    whereClause.rating = {
      [Op.gte]: ratinggte,
    };
  } else if (ratinglte) {
    whereClause.rating = { [Op.lte]: ratinglte };
  } else if (rating) {
    whereClause.rating = { [Op.eq]: rating };
  }

  if (description) {
    whereClause.description = { [Op.iLike]: `%${description}%` };
  }

  if (userId) {
    whereClause.userId = userId;
  }
  if (productId) { 
    whereClause.productId = productId;
  }

  if (createdAt) {
    whereClause.createdAt = {
      [Op.gte]: new Date(createdAt),
    };
  }

  if (deleted) {
    whereClause.deleted = deleted
  }

  if (order === "createdAt") {
    orderClause.push(["createdAt", direction === "DESC" ? "DESC" : "ASC"]);
  } else if (order === "ratinggte") {
    orderClause.push(["rating", direction === "DESC" ? "DESC" : "ASC"]);
  } else if (order === "alphabetical") {
    orderClause.push(["name", direction === "DESC" ? "DESC" : "ASC"]);
  }

  const reviews = Review.findAndCountAll({
    where: whereClause,
    order: orderClause,
  });

  return reviews;
};

const getReviewDetail = async (id) => {
  const reviewDetail = await Review.findByPk(id);

  if (!reviewDetail) throw new Error(`No existe ${id}`);
  if (reviewDetail.deleted === true)
    throw new Error(`${id} fue anteriormente desactivado`);

  return reviewDetail;
};

const createReview = async (name, rating, description, productId, userId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error(`User not found`);
  }

  const product = await Product.findOne({
    where: { id: productId },
  });

  if (!product) {
    throw new Error(`Product not found`);
  }

  const existingReview = await Review.findOne({
    where: {
      userId: user.id,
      productId: product.id,
    },
  });

  if (existingReview) {
    throw new Error(
      `There already exists a review for product ${product.name} for user ${user.email}`
    );
  }

  const newReview = await Review.create({
    name,
    rating,
    description,
    productId: product.id,
    userId: user.id,
  });

  await user.addReview(newReview);
  await product.addReview(newReview);

  const review = await Review.findByPk(newReview.id);

  return review;
};

const updateReview = async (id, name, rating, description) => {
  const review = await Review.findByPk(id);

  if (!review) {
    throw new Error(`Review not found`);
  }

  review.name = name;
  review.rating = rating;
  review.description = description;
  await review.save();

  return review;
};

const deleteReview = async (id, undo) => {
  let review = await Review.findByPk(id);

  await review.softDelete();

  return review, `Deleted is now ${review.deleted} for ${review.name} with id: ${id}`
};

module.exports = {
  getReviews,
  getReviewDetail,
  createReview,
  updateReview,
  deleteReview,
};
