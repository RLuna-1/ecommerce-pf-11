const { Product, Category, User, License, Platform } = require("../db.js");
const fs = require("fs");
const jwt = require("jsonwebtoken");



const seedDB = async () => {
  try {
    // Leer el archivo JSON
    const rawData = fs.readFileSync(`${__dirname}/products.json`);
    const products = JSON.parse(rawData);

    // Crear los productos en la base de datos
    for (const product of products) {
      // Crear el producto en la base de datos
      const createdProduct = await Product.create({
        name: product.name,
        description: product.description,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
      });

      // Obtener o crear las licencias correspondientes
      const productLicenses = await Promise.all(
        product.licenses.map(async (license) => {
          let existingLicense = await License.findOne({ where: { name: license } });
          if (!existingLicense) {
            existingLicense = await License.create({ name: license });
          }
          return existingLicense;
        })
      );

      // Obtener o crear las categorías correspondientes
      const productCategories = await Promise.all(
        product.categories.map(async (category) => {
          let existingCategory = await Category.findOne({ where: { name: category } });
          if (!existingCategory) {
            existingCategory = await Category.create({ name: category });
          }
          return existingCategory;
        })
      );

      // Obtener o crear las plataformas correspondientes
      const productPlatforms = await Promise.all(
        product.platforms.map(async (platform) => {
          let existingPlatform = await Platform.findOne({ where: { name: platform } });
          if (!existingPlatform) {
            existingPlatform = await Platform.create({ name: platform });
          }
          return existingPlatform;
        })
      );

      // Asociar el producto con las categorías, plataformas y licencias correspondientes
      await createdProduct.addCategories(productCategories, { through: { timestamps: false } });
      await createdProduct.addPlatforms(productPlatforms, { through: { timestamps: false } });
      await createdProduct.addLicenses(productLicenses, { through: { timestamps: false } });
    }

    console.log("Products uploaded successfully.");
  } catch (error) {
    console.error("Failed to upload dummy products:", error);
  }
};


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      "shnawg is not paying the bills",
      (error, decodedToken) => {
        if (error) {
          console.log(error.message);
          return res.status(400).json(`Must be logged in to perform this action`);
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  }
};

const checkUser = (req, res, next) => {
  if (token) {
    jwt.verify(
      token,
      "shnawg is not paying the bills",
      async (error, decodedToken) => {
        if (error) {
          console.log(error.message);
          next();
        } else {
          console.log(decodedToken);
          let user = await User.findByPk(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { seedDB, requireAuth };
