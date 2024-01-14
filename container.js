const container = require("typedi").Container;

const config = require("./config/config");
const User = require("./models/user");
const Building = require("./models/building");
const RoomReview = require("./models/room_review");
const UserService = require("./service/user");
const UserController = require("./controller/user");
const Token = require("./models/token");
const AuthService = require("./service/auth");
const AuthController = require("./controller/auth");

// regist containers
container.set("config", config);

// models
container.set("UserModel", User);
container.set("BuildingModel", Building);
container.set("RoomReviewModel", RoomReview);
container.set("TokenModel", Token);

// service
container.set("UserService", new UserService(container));
container.set("AuthService", new AuthService(container));

// controller
container.set("UserController", new UserController(container));
container.set("AuthController", new AuthController(container));

module.exports = container;