const { Product, Category } = require("../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getProducts = async (
  name,
  quantity,
  quantitygte,
  quantitylte,
  price,
  pricegte,
  pricelte,
  categories,
  order,
  direction,
  page = 1
) => {
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const orderClause = [];
  const whereClause = {};
  let includeClause = [];

  {
    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` };
    }
  }

  {
    if (quantitygte && quantitylte) {
      whereClause.quantity = {
        [Op.between]: [quantitygte, quantitylte],
      };
    } else if (quantitygte) {
      whereClause.quantity = {
        [Op.gte]: quantitygte,
      };
    } else if (quantitylte) {
      whereClause.quantity = { [Op.lte]: quantitylte };
    } else if (quantity) {
      whereClause.quantity = { [Op.eq]: quantity };
    }
  }

  {
    if (pricegte && pricelte) {
      whereClause.price = {
        [Op.between]: [pricegte, pricelte],
      };
    } else if (pricegte) {
      whereClause.price = {
        [Op.gte]: pricegte,
      };
    } else if (pricelte) {
      whereClause.price = {
        [Op.lte]: pricelte,
      };
    } else if (price) {
      whereClause.price = {
        [Op.eq]: price,
      };
    }
  }

  if (categories) {
  }

  {
    if (order === "price") {
      orderClause.push(["price", direction === "DESC" ? "DESC" : "ASC"]);
    } else if (order === "quantity") {
      orderClause.push(["quantity", direction === "DESC" ? "DESC" : "ASC"]);
    }
  }

  const responseProducts = await Product.findAndCountAll({
    where: whereClause,
    order: orderClause,
    limit: pageSize,
    offset: offset,
    include: includeClause,
  });

  if (!responseProducts.rows.length) {
    throw new Error(`There are no products with the given data`);
  }

  return responseProducts;
};

const createProduct = async (
  name,
  description,
  image,
  quantity,
  price,
  categories
) => {
  const newProduct = await Product.create({
    name: name,
    description: description,
    image: image,
    quantity: quantity,
    price: price,
    categories: categories,
  });

  console.log(newProduct);
  return await newProduct;
};

const getProductDetail = async (id) => {
  const productDetail = await Product.findByPk(id);

  console.log(productDetail);

  if (!productDetail) throw new Error(`No existe ${id}`);

  return productDetail;
};

const updateProduct = async (
  id,
  name,
  description,
  image,
  quantity,
  price,
  categories
) => {
  const existingProduct = await Product.findByPk(id);

  const updatedProduct = await existingProduct.update({
    name: name,
    description: description,
    image: image,
    quantity: quantity,
    price: price,
    categories: categories,
  });

  return updatedProduct
};

const deleteProduct = async (id) => {
  let product = await Product.findByPk(id);

  await product.softDelete()

  return product

}

module.exports = { getProducts, createProduct, getProductDetail, updateProduct, deleteProduct };
