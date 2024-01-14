const express = require("express");
const router = express.Router();
const container = require("../container");

const userController = container.get("UserController");

router.route("/:id")
    .get((req, res) => userController.handleGetUser(req, res))
    .patch((req, res) => userController.handleUpdateUser(req, res))
    .delete((req, res) => userController.handleDeleteUser(req, res));

router.post("/", (req, res) => userController.handleCreateUser(req, res));

module.exports = router;