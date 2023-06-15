const usersController = require("../controllers/usersController");

async function getUsers(req, res) {
  const { name } = req.query;
  try {
    let users;
    if (name) {
      users = await usersController.getUserByName(name);
      if (!users) {
        users = await usersController.getAllUsers();
      }
    } else {
      users = await usersController.getAllUsers();
    }

    const filteredUsers = users.filter((user) => !user.disabled);

    if (filteredUsers.length === 0) {
      // Obtener nuevamente los usuarios
      const updatedUsers = await usersController.getAllUsers();
      // Filtrar los usuarios con disabled en false
      const updatedFilteredUsers = updatedUsers.filter(
        (user) => !user.disabled
      );
      return res.json(updatedFilteredUsers);
    }

    return res.json(filteredUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await usersController.getUserById(id);
    if (!user || user.disabled === true) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
}

async function createUser(req, res) {
  try {
    const newUser = await usersController.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
}

async function updateUserHandler(req, res) {
  try {
    await usersController.updateUser(req, res);
  } catch (error) {
    console.error("Error en el controlador de updateUser:", error);
    res.status(500).json({ message: "Ocurrió un error en el servidor" });
  }
}

async function deleteUserHandler(req, res) {
  try {
    const { id } = req.params;
    await usersController.deleteUser(id);
    res.status(200).json({ message: "Usuario desactivado correctamente" });
  } catch (error) {
    console.error("Error en el controlador de deleteUser:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al desactivar el usuario" });
  }
}



module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserHandler,
  updateUserHandler,
};
