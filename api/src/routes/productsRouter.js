const { Router } = require("express");

const {
  getProducts,
  createProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");

const { validationGetProducts } = require("../utils/validations.js");
const { requireAuth } = require("../utils/index.js");

const productsRouter = Router();

productsRouter.get(
  "/",
  validationGetProducts,
  async (req, res) => {
    try {
      const showProducts = await getProducts(
        req.query.name,
        req.query.quantity,
        req.query.quantitygte,
        req.query.quantitylte,
        Number(req.query.price),
        req.query.pricegte,
        req.query.pricelte,
        req.query.categories,
        req.query.order,
        req.query.direction,
        req.query.page,req.query.platform, req.query.license
      );
      res.status(200).json(await showProducts);
    } catch (error) {
      console.log(error);
      res.status(400).json(error.message);
    }
  }
);

productsRouter.get("/:id", async (req, res) => {
  try {
    const showProductDetail = await getProductDetail(req.params.id);
    res.status(200).json(showProductDetail);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

productsRouter.post("/", async (req, res) => {
  const { name, description, image, quantity, price, categories } = req.body;
  console.log(req.body);
  try {
    const newProduct = await createProduct(
      name,
      description,
      image,
      quantity,
      price,
      categories
    );
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

productsRouter.put("/:id", async (req, res) => {
  try {
    const newUpdateProduct = await updateProduct(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.image,
      req.body.quantity,
      req.body.price
    );

    res.status(200).json(newUpdateProduct);
  } catch (error) {
    res.status(400).json(message.error);
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const productDelete = await deleteProduct(req.params.id);
    res.status(200).json(productDelete);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = productsRouter;
