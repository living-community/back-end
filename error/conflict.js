const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom_error");

class Conflict extends CustomError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.CONFLICT;
    }
};

module.exports = Conflict;