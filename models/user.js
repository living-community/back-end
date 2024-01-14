const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            nickname: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING(128),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: "User",
            tableName: "user",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.User.hasMany(db.RoomReview);
        db.User.hasOne(db.Token);
    }
};

module.exports = User;