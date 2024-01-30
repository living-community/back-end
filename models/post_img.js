const Sequelize = require("sequelize");

class PostImg extends Sequelize.Model {
    static initiate(sequelize) {
        PostImg.init({
            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            paranoid: false,
            modelName: "PostImg",
            tableName: "post_img",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.PostImg.belongsTo(db.Post);
    }
};

module.exports = PostImg;