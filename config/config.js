const config = {
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        accessExpiresIn: process.env.ACCESS_EXPIRES_IN,
        refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,
        algorithm: process.env.JWT_ALGORITHM,
    },
    db: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        dialect: process.env.DIALECT,
        host: process.env.DB_HOST,
    }
};

module.exports = config;