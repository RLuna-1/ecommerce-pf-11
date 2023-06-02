const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const getAllCategoryHandlres = async (req, res) => {
  try {
    const response = await getAllCategories();
    return res.status(200).send(response);
  } catch (error) {
    return res.status(404).json({ error: "Category not found" });
  }
};

const getCategoryByIdHandlres = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getCategoryById(id);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while getting the Category" });
  }
};

const createCategoryHandlres = async (req, res) => {
  const { name } = req.body;

  try {
    const response = await createCategory(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategoryHandlres = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (id) {
      const response = await updateCategory(id, name);
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
};

const deleteCategoryHandlres = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const response = await deleteCategory(id);
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
};

module.exports = {
  getAllCategoryHandlres,
  getCategoryByIdHandlres,
  createCategoryHandlres,
  updateCategoryHandlres,
  deleteCategoryHandlres,
};
