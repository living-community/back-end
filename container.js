const container = require("typedi").Container;

const config = require("./config/config");
const User = require("./models/user");
const Post = require("./models/post");
const RoomReview = require("./models/room_review");
const UserService = require("./service/user");
const UserController = require("./controller/user");
const Token = require("./models/token");
const AuthService = require("./service/auth");
const AuthController = require("./controller/auth");
const PostService = require("./service/post");
const PostController = require("./controller/post")

// regist containers
container.set("config", config);

// models
container.set("UserModel", User);
container.set("RoomReviewModel", RoomReview);
container.set("TokenModel", Token);
container.set("PostModel", Post);

// service
container.set("UserService", new UserService(container));
container.set("AuthService", new AuthService(container));
container.set("PostService", new PostService(container));

// controller
container.set("UserController", new UserController(container));
container.set("AuthController", new AuthController(container));
container.set("PostController", new PostController(container));

module.exports = container;