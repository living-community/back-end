const express = require("express");
const router = express.Router();
const container = require("../container");

const userController = container.get("UserController");
const authController = container.get("AuthController");

router.route("/:nickname")
    .get((req, res) => userController.handleGetUser(req, res))
    .patch(
        // (req, res, next) => authController.authToken(req, res, next), 
        (req, res) => userController.handleUpdateUser(req, res)
    )
    .delete(
        // (req, res, next) => authController.authToken(req, res, next),
        (req, res) => userController.handleDeleteUser(req, res)
    );

router.post("/", (req, res) => userController.handleCreateUser(req, res));

module.exports = router;