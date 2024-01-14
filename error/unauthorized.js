const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom_error");

class Unauthorized extends CustomError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }
};

module.exports = Unauthorized;