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
  direction
) => {
  const whereClause = {};

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
    whereClause.description = {[Op.iLike]: `%${description}%`}
  }

  if (userId) {
    whereClause.userId = userId;
  }

  if (createdAt) {
    whereClause.createdAt = {
      [Op.gte]: new Date(createdAt),
    };
  }

  const reviews = Review.findAll({
    where: whereClause,
  });

  return reviews;
};

module.exports = { getReviews };
