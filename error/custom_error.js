class CustomError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
    }
}

module.exports = CustomError;