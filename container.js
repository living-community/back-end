const container = require("typedi").Container;

const config = require("./config/config");
const User = require("./models/user");
const Building = require("./models/building");
const RoomReview = require("./models/room_review");
const UserService = require("./service/user");
const UserController = require("./controller/user");

// regist containers
container.set("config", config);

// models
container.set("UserModel", User);
container.set("BuildingModel", Building);
container.set("RoomReviewModel", RoomReview);

// service
container.set("UserService", new UserService(container));

// controller
container.set("UserController", new UserController(container));

module.exports = container;