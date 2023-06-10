const { Router } = require("express");
const licenseRouter = Router();

const {
    getAllLicenses,
    createLicense,
    getLicenseById,
    updateLicense,
    deleteLicense,
  } = require("../controllers/licenseController");
  
 licenseRouter.get("/", async (req, res) => {
    try {
      const response = await getAllLicenses();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(404).json({ error: "License not found" });
    }
  });
  
licenseRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await getLicenseById(id);
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ error: "License not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while getting the License" });
    }
  });
  
licenseRouter.post("/", async (req, res) => {
    const { name } = req.body;
  
    try {
      const response = await createLicense(name);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
licenseRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      if (id) {
        const response = await updateLicense(id, name);
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(404).json({ error: "License not found" });
    }
  });
  
licenseRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      if (id) {
        const response = await deleteLicense(id);
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(404).json({ error: "License not found" });
    }
  });
  
  module.exports = {
    licenseRouter
  };