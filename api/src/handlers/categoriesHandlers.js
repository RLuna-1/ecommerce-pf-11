// const {
//     getAllCategories,
//     getCategoriesById,
//     createCategories,
//     updateCategories,
//     deleteCategories,
//   } = require("../controllers/categoriesController");
  
//   const getAllCategoriesHandlres = async (req, res) => {
//     try {
//       const response = await getAllCategories();
//       return res.status(200).send(response);
//     } catch (error) {
//       return res.status(404).json({ error: "Categories not found" });
//     }
//   };
  
//   const getCategoriesByIdHandlres = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const response = await getCategoriesById(id);
//       if (response) {
//         return res.status(200).json(response);
//       } else {
//         return res.status(404).json({ error: "Categories not found" });
//       }
//     } catch (error) {
//       res
//         .status(500)
//         .json({ error: "An error occurred while getting the Categories" });
//     }
//   };
  
//   const createCategoriesHandlres = async (req, res) => {
//     const { valor, fecha, comentario, productoId, userId } = req.body;
  
//     try {
//       const response = await createCategories(
//         valor,
//         fecha,
//         comentario,
//         productoId,
//         userId
//       );
//       res.status(200).json(response);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  
//   const updateCategoriesHandlres = async (req, res) => {
//     const { id } = req.params;
//     const { valor } = req.body;
  
//     const response = await updateCategories( id, valor )
//     if (response) {
//       response.valor = valor;   
//       await response.save();
//       res.status(200).json(response);
//     } else {
//       res.status(404).json({ error: 'Calificación no encontrada' });
//     }
    
  
  
//   };
  
//   const deleteCategoriesHandlres = async (req, res) => {
  
//     res.status(200).send("aqui vamos delete ID");
//   };
  
//   module.exports = {
//     getAllCategoriesHandlres,
//     getCategoriesByIdHandlres,
//     createCategoriesHandlres,
//     updateCategoriesHandlres,
//     deleteCategoriesHandlres,
//   };
  