const Sequelize = require("sequelize");

class RoomReview extends Sequelize.Model {
    static initiate(sequelize) {
        RoomReview.init({
            title: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            star: {
                type: Sequelize.SMALLINT, // 범위: 0 ~ 5
                defaultValue: 0,
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: "RoomReview",
            tableName: "room_review",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        });
    }

    static associate(db) {
        db.RoomReview.belongsTo(db.User);
        db.RoomReview.belongsTo(db.Building);
    }
};

module.exports = RoomReview;