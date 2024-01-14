const NotFound = require("../error/not-found");

const notFoundHandler = (req, res, next) => {
    throw new NotFound(`${req.method} ${req.url} 요청을 처리할 수 없습니다.`);
};

const errorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({message: err.message});
};

module.exports = { notFoundHandler, errorHandler };