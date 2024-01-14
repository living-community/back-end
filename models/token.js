const Sequelize = require("sequelize");

class Token extends Sequelize.Model {
    static initiate(sequelize) {
        Token.init({
            content: {
                type: Sequelize.STRING(256),
                allowNull: false, 
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: "Token",
            tableName: "token",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Token.belongsTo(db.User, { onDelete: "cascade" });
    }
};

module.exports = Token;