const { License } = require("../db");

const createLicense = async (name) => {

  return await License.create({
    name,
  });
   
 };

const getAllLicenses = async () => {

     return await License.findAll();
    
  };

const getLicenseById = async (id) => {

    return await License.findByPk(id);
   
 }; 

const updateLicense = async (id,name) => {

  const existingLicense = await License.findByPk(id);
  const License = await License.update({name});

  return existingLicense
};

const deleteLicense = async (id) => {

  let license = await License.findByPk(id)

  await license.softDelete()

  return (license, `${id} fue desactivado correctamente`)

}
  module.exports = {
    getAllLicenses,
    createLicense,
    getLicenseById,
    updateLicense,
    deleteLicense
}