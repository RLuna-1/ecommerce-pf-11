const { Product, Category, Platform, License } = require("../db.js");
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
  page = 1,
  platform,
  license
) => {
  const pageSize = 8;
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

  {
    if (order === "price") {
      orderClause.push(["price", direction === "DESC" ? "DESC" : "ASC"]);
    } else if (order === "quantity") {
      orderClause.push(["quantity", direction === "DESC" ? "DESC" : "ASC"]);
    } else if (order === "alphabetical") {
      orderClause.push(["name", direction === "DESC" ? "DESC" : "ASC"]);
    }
  }

  const responseProducts = await Product.findAndCountAll({
    where: whereClause,
    order: orderClause,
    limit: pageSize,
    offset: offset,
    distinct:true,
    include: [
      {
        model: Category,
        attributes: ["id","name", "deleted"],
        through: { attributes: [] },
        where: categories ? { name: { [Op.iLike]: `%${categories}%` } } : {},
      },
      {
        model: Platform,
        attributes: ["id","name"],
        through: { attributes: [] },
        where: platform ? { name: { [Op.iLike]: `%${platform}%` } } : {},
      },
      {
        model: License,
        attributes: ["id","name"],
        through: { attributes: [] },
        where: license ? { name: { [Op.iLike]: `%${license}%` } } : {},
      },
    ],
  });

  console.log(responseProducts.count)

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
  const productDetail = await Product.findByPk(id, {
    include: [
      {
        model: Category,
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        through: {
          attributes: [],
        },
      },
      {
        model: License,
        through: {
          attributes: [],
        },
      },
    ],
  });

  console.log(productDetail);

  if (!productDetail) throw new Error(`No existe ${id}`);
  if (productDetail.deleted === true)
    throw new Error(`${id} fue anteriormente desactivado`);

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

  return updatedProduct;
};

const deleteProduct = async (id) => {
  let product = await Product.findByPk(id);

  await product.softDelete();

  return product, `${id} fue desactivado correctamente`;
};

module.exports = {
  getProducts,
  createProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
