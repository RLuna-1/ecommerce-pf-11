const { Category } = require("../db");

const createCategory = async (name) => {

  return await Category.create({
    name,
  });
   
 };

const getAllCategories = async () => {

     return await Category.findAll();
    
  };

const getCategoryById = async (id) => {

    return await Category.findByPk(id);
   
 }; 

const updateCategory = async (id,name) => {

  const existingCategory = await Category.findByPk(id);
  const updateCategory = await existingCategory.update({name});

  return updateCategory
};

const deleteCategory = async (id) => {

  let category = await Category.findByPk(id)

  await category.softDelete()

  return (category, `${id} fue desactivado correctamente`)

}
  module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}