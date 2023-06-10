const { Router } = require("express");
const platformRouter = Router();

const {
  getAllPlatforms,
  createPlatform,
  getPlatformById,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platformController");

platformRouter.get("/", async (req, res) => {
  try {
    const response = await getAllPlatforms();
    return res.status(200).send(response);
  } catch (error) {
    return res.status(404).json({ error: "Platform not found" });
  }
});

platformRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getPlatformById(id);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "Platform not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while getting the Platform" });
  }
});

platformRouter.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const response = await createPlatform(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

platformRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (id) {
      const response = await updatePlatform(id, name);
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(404).json({ error: "Platform not found" });
  }
});

platformRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const response = await deletePlatform(id);
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(404).json({ error: "Platform not found" });
  }
});

module.exports = {
  platformRouter,
};