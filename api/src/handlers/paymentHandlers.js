const {  getAllPayment,
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment } = require("../controllers/paymentControllers");

  
  const getAllPaymentHandlres = async (req, res) => {
    try {
      const response = await getAllPayment();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(404).json({ error: "Payment not found" });
    }
  };
  
  const getPaymentByIdHandlres = async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await getPaymentById(id);
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ error: "Payment not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while getting the Payment" });
    }
  };
  
  const createPaymentHandlres = async (req, res) => {
    const { metodo } = req.body;
  
    try {
      const response = await createPayment(metodo);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const updatePaymentHandlres = async (req, res) => {
    const { id } = req.params;
    const { metodo } = req.body;
  
    try {
      if (id) {
        const response = await updatePayment(id, metodo);
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(404).json({ error: "Payment not found" });
    }
  };
  
  const deletePaymentHandlres = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (id) {
        const response = await deletePayment(id);
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(404).json({ error: "Payment not found" });
    }
  };
  
  module.exports = {
    getAllPaymentHandlres,
    getPaymentByIdHandlres,
    createPaymentHandlres,
    updatePaymentHandlres,
    deletePaymentHandlres,
  };
  