const { Platform } = require("../db");

const createPlatform = async (name) => {

  return await Platform.create({
    name,
  });
   
 };

const getAllPlatforms = async () => {

     return await Platform.findAll();
    
  };

const getPlatformById = async (id) => {

    return await Platform.findByPk(id);
   
 }; 

const updatePlatform = async (id,name) => {

  const existingPlatform = await Platform.findByPk(id);
  const Platform = await Platform.update({name});

  return existingPlatform
};

const deletePlatform = async (id) => {

  let platform = await Platform.findByPk(id)

  await platform.softDelete()

  return (platform, `${id} fue desactivado correctamente`)

}
  module.exports = {
    getAllPlatforms,
    createPlatform,
    getPlatformById,
    updatePlatform,
    deletePlatform
}