const { Router } = require("express");
const {getUsers, getUserById, createUser, deleteUserHandler, updateUserHandler} = require('../handlers/usersHandler')

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get("/?name", getUsers)

usersRouter.get("/:id", getUserById);

usersRouter.post("/", createUser);

usersRouter.put("/:id", updateUserHandler);

usersRouter.delete("/:id", deleteUserHandler)


module.exports = usersRouter;
