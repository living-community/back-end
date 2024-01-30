const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init({
            title: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },

            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            views: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },

            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },

            category: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            modelName: "Post",
            tableName: "post",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.PostImg);
    }
};

module.exports = Post;