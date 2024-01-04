const Sequelize = require("sequelize");

class Building extends Sequelize.Model {
    static initiate(sequelize) {
        Building.init({
            name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            average_stars: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: "Building",
            tableName: "building",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Building.hasMany(db.RoomReview);
    }
}

module.exports = Building;