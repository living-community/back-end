const CustomError = require("./custom_error");

class NotFound extends CustomError {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

module.exports = NotFound;