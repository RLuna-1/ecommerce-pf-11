
const nodemailer = require('nodemailer');
const { User } = require("../db");
const jwt = require("jsonwebtoken");


async function getUserByName(name) {
  const user = await User.findAll({ where: { name } });
  return user;
}

async function getAllUsers() {
  let users = await User.findAll();
  return users;
}

async function getUserById(id) {
  const user = await User.findOne({ where: { id } });
  return user;
}

async function createUser(userData) {
  const newUser = await User.create(userData);
  return newUser;
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const {
      name,
      last_name,
      user_name,
      image,
      email,
      password,
      phone,
      admin,
      disabled,
    } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.name = name;
    user.last_name = last_name;
    user.user_name = user_name;
    user.image = image;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.admin = admin;
    user.disabled = disabled;

    await user.save();

    return res
      .status(200)
      .json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res
      .status(500)
      .json({ message: "Ocurrió un error al actualizar el usuario" });
  }
}

async function deleteUser(id) {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (user.disabled = true) {user.disabled = false}
  else {user.disabled = true;}
  
  await user.save();
}


// const checkUser = (req, res, next) => {
//   if (token) {
//     jwt.verify(
//       token,
//       "shnawg is not paying the bills",
//       async (error, decodedToken) => {
//         if (error) {
//           console.log(error.message);
//           next();
//         } else {
//           console.log(decodedToken);
//           let user = await User.findByPk(decodedToken.id);
//           res.locals.user = user;
//           next();
//         }
//       }
//     );
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

module.exports = {
  getUserByName,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
