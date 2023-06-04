const { Pago } = require("../db");

const createPayments = async (metodo) => {

  return await Pago.create({
    metodo,
  });
   
 };

const  getAllPayments = async () => {

     return await Pago.findAll();
    
  };

const getPaymentsById = async (id) => {

    return await Pago.findByPk(id);
   
 }; 

const updatePayments = async (id,metodo) => {

  const existingPayments = await Pago.findByPk(id);
  const updatePayments = await existingPayments.update({metodo});

  return updatePayments
};

const deletePayments = async (id) => {
  const deletePayments = await Pago.destroy({
  where :{id}
  });

return deletePayments

}
  module.exports = {
    getAllPayments,
    createPayments,
    getPaymentsById,
    updatePayments,
    deletePayments
}