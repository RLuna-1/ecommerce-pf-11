const { Product, Category} = require("../db.js");
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
  platforms,
  licenses,
  pageSize = 8,
  deleted
) => {
  const offset = (page - 1) * pageSize;

  const orderClause = [];
  const whereClause = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

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

  if (platforms && platforms.length > 0) {
    whereClause.platforms = {
      [Op.contains]: platforms,
    };
  }

  if (licenses && licenses.length > 0) {
    whereClause.licenses = {
      [Op.contains]: licenses,
    };
  }

  if (deleted) {
    whereClause.deleted = deleted
  }

  if (order === "price") {
    orderClause.push(["price", direction === "DESC" ? "DESC" : "ASC"]);
  } else if (order === "quantity") {
    orderClause.push(["quantity", direction === "DESC" ? "DESC" : "ASC"]);
  } else if (order === "alphabetical") {
    orderClause.push(["name", direction === "DESC" ? "DESC" : "ASC"]);
  }

  

  const responseProducts = await Product.findAndCountAll({
    where: whereClause,
    order: orderClause,
    limit: pageSize,
    offset: offset,
    distinct: true,
    include: [
      {
        model: Category,
        attributes: ["id", "name", "deleted"],
        through: { attributes: [] },
        where: categories
          ? {
              name: { [Op.iLike]: { [Op.any]: categories } },
              deleted: false,
            }
          : { deleted: false },
      },
    ],
  });

  //console.log(responseProducts.count);

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
  categories,
  platforms,
  licenses
) => {
  const newProduct = await Product.create({
    name: name,
    description: description,
    image: image,
    quantity: quantity,
    price: price,
    platforms: platforms,
    licenses: licenses,
  });

  const productCategories = await Promise.all(
    categories.map(async (category) => {
      const [existingCategory] = await Category.findOrCreate({
        where: { name: category },
      });
      return existingCategory;
    })
  );

  await newProduct.addCategories(productCategories, {
    through: { timestamps: false },
  });

  const product = await Product.findByPk(newProduct.id, {
    include: {
      model: Category,
      through: { attributes: [] },
      attributes: ["id", "name"],
    },
  });

  return product;
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
    ],
  });

  //console.log(productDetail);

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
  categories,
  platforms,
  licenses
) => {
  const existingProduct = await Product.findByPk(id);

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const updatedProduct = await existingProduct.update({
    name: name,
    description: description,
    image: image,
    quantity: quantity,
    price: price,
    platforms: platforms,
    licenses: licenses,
  });

  if (categories) {
    const categoryIds = Array.isArray(categories) ? categories : [categories];
    await updatedProduct.setCategories(categoryIds);
  }

  const product = await Product.findByPk(updatedProduct.id, {
    include: {
      model: Category,
      through: { attributes: [] },
      attributes: ["id", "name"],
    },
  });

  return product;
};

const deleteProduct = async (id) => {
  let product = await Product.findByPk(id);

  await product.softDelete();

  return product, `Deleted is now ${product.deleted} for ${product.name} with id: ${id}`;
};

module.exports = {
  getProducts,
  createProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
