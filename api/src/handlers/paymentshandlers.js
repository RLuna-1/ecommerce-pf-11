const {  getAllPayments,
    createPayments,
    getPaymentsById,
    updatePayments,
    deletePayments} = require("../controllers/paymentsController");

  
  const getAllPaymentsHandlres = async (req, res) => {
    try {
      const response = await getAllPayments();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(404).json({ error: "Payments not found" });
    }
  };
  
  const getPaymentsByIdHandlres = async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await getPaymentsById(id);
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ error: "Payments not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while getting the Payments" });
    }
  };
  
  const createPaymentsHandlres = async (req, res) => {
    const { metodo } = req.body;
   
  
    try {
      const response = await createPayments(metodo);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const updatePaymentsHandlres = async (req, res) => {
    const { id } = req.params;
    const { metodo } = req.body;
  
    try {
      if (id) {
        const response = await updatePayments(id, metodo);
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(404).json({ error: "Payments not found" });
    }
  };
  
  const deletePaymentsHandlres = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (id) {
        const response = await deletePayments(id);
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(404).json({ error: "Payments not found" });
    }
  };
  
  module.exports = {
    getAllPaymentsHandlres,
    getPaymentsByIdHandlres,
    createPaymentsHandlres,
    updatePaymentsHandlres,
    deletePaymentsHandlres,
  };
  