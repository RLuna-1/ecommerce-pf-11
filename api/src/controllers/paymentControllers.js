const { Pago } = require("../db");

const createPayment = async (metodo) => {

  return await Pago.create({
    metodo,
  });
   
 };

const getAllPayment = async () => {

     return await Pago.findAll();
    
  };

const getPaymentById = async (id) => {

    return await Pago.findByPk(id);
   
 }; 

const updatePayment = async (id,metodo) => {

  const existingPayment = await Pago.findByPk(id);
  const updatePayment = await existingPayment.update({metodo});

  return updatePayment
};

const deletePayment = async (id) => {
  const deletePayment = await Pago.destroy({
  where :{id}
  });

return deletePayment

}
  module.exports = {
    getAllPayment,
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment
}