const { Router } = require("express");
const { getAllCategoryHandlres, createCategoryHandlres, getCategoryByIdHandlres, updateCategoryHandlres, deleteCategoryHandlres } = require("../handlers/catergoryHandlers");
const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategoryHandlres);

categoriesRouter.get("/:id", getCategoryByIdHandlres);

categoriesRouter.post("/", createCategoryHandlres);

categoriesRouter.put("/:id", updateCategoryHandlres);

categoriesRouter.delete("/:id", deleteCategoryHandlres);

module.exports = categoriesRouter;