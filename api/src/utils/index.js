const { Product, Category, User, License, Platform } = require("../db.js");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const seedDB = async () => {
  try {
    const rawData = fs.readFileSync(`${__dirname}/products.json`);
    const products = JSON.parse(rawData);

    for (const product of products) {
      const existingProduct = await Product.findOne({
        where: { name: product.name },
      });
      if (existingProduct) {
        continue;
      }

      const lowercaseLicenses = product.licenses.map((license) =>
        license.toLowerCase()
      );
      const lowercasePlatforms = product.platforms.map((platform) =>
        platform.toLowerCase()
      );


      const createdProduct = await Product.create({
        name: product.name,
        description: product.description,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
        platforms: lowercasePlatforms,
        licenses: lowercaseLicenses,
      });

      const productCategories = await Promise.all(
        product.categories.map(async (category) => {
          const [existingCategory] = await Category.findOrCreate({
            where: { name: category },
          });
          return existingCategory;
        })
      );

      await createdProduct.addCategories(productCategories, {
        through: { timestamps: false },
      });
    }

    console.log("Products upload completed.");
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
          return res
            .status(400)
            .json(`Must be logged in to perform this action`);
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

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }
    const decoded = jwt.verify(token, "secreto");
    const userId = decoded.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: "Error de autenticación" });
  }
};

const getSuccess = (req, res) => {
  try {
    res.status(200).json("Sucess!");
  } catch (error) {
    res.status(500).json({ error: "An error ocurred " });
  }
};

module.exports = { seedDB, requireAuth, authMiddleware, getSuccess };
