const { Router } = require("express");
const usersRouter = require("./usersRoute");
const productsRouter = require("./productsRoute");
const salesRouter = require("./sales");
const wishlistsRouter = require("./wishlistsRouter");
const saledetailsRouter = require("./saledetailsRouter");
const categoriesRouter = require("./categoriesRouter");
const paymentsRouter = require("./paymentsRouter");
const transactionsRouter = require("./transactionsRouter");
const ratingsRouter = require("./ratingsRouter");


const mainRouter = Router();

//const { videogamesRouter } = require("./videogameRoute");
//const { genresRouter } = require("./genresRoute");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use("/videogames", videogamesRouter);
//router.use("/genres", genresRouter);

mainRouter.use("/users", usersRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/sales", salesRouter);
mainRouter.use("/wishlists", wishlistsRouter);
mainRouter.use("/saledetails", saledetailsRouter);
mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/payments", paymentsRouter);
mainRouter.use("/transactions", transactionsRouter);
mainRouter.use("/ratings", ratingsRouter);


module.exports = mainRouter;
