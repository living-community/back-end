const express = require("express");
const router = express.Router();
const container = require("../container");

const authController = container.get("AuthController");

router.post("/login", (req, res) => authController.login(req, res));
router.get("/logout",
    (req, res, next) => authController.authToken(req, res, next),
    (req, res) => authController.logout(req, res)
);

module.exports = router;