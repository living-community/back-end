const multer = require("multer");
const path = require("path");
const fs = require("fs");
const container = require("../container");
const express = require("express");

const router = express.Router();

const authController = container.get("AuthController");
const postController = container.get("PostController");

router.route("/")
    .get(
        (req, res, next) => authController.authToken(req, res, next),
        (req, res) => postController.handleGetPostList(req, res)
    )
    .post(
        (req, res, next) => authController.authToken(req, res, next),
        (req, res) => postController.handleCreatePost(req, res),
    );

router.route("/:id")
    .get(
        (req, res, next) => authController.authToken(req, res, next),
        (req, res) => postController.handleGetPost(req, res)
    )
    .patch(
        (req, res, next) => authController.authToken(req, res, next),
        (req, res) => postController.handleUpdatePost(req, res)
    )
    .delete(
        (req, res, next) => authController.authToken(req, res, next),
        (req, res) => postController.handleDeletePost(req, res)
    );

module.exports = router;
