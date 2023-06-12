const { Router } = require("express");
const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const salesRouter = require("./salesRouter");
const wishlistRouter = require("./wishlistRouter");
const saledetailsRouter = require("./saleDetailsRouter");
const categoriesRouter = require("./categoriesRouter");
const paymentsRouter = require("./paymentsRouter");
const transactionsRouter = require("./transactionsRouter");
const ratingsRouter = require("./ratingsRouter");
const authRouter = require("./authRouter")


const mainRouter = Router();

mainRouter.use("/users", usersRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/sales", salesRouter);
mainRouter.use("/wishlist", wishlistRouter);
mainRouter.use("/saledetails", saledetailsRouter);
mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/payments", paymentsRouter);
mainRouter.use("/transactions", transactionsRouter);
mainRouter.use("/ratings", ratingsRouter);
mainRouter.use("/auth", authRouter)

module.exports = mainRouter;
