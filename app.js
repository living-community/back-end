require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const { notFoundHandler, errorHandler } = require("./middleware/error-handler");
const webSocket = require("./socket/socket");

const PORT = process.env.PORT || 3000;

// const corsOptions = {
    // origin: "http://example.com",
    // credentials: true, // header 전송 시 필요
// }

const app = express();

sequelize.sync({ force: false })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan("dev"));
app.use(cors()); // front와 맞출 때 cors 설정 필요
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use("/api/auth", require("./router/auth"));
app.use("/api/user", require("./router/user"));
app.use("/api/post", require("./router/post"));

// error handler
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT);
webSocket(server, app, null);