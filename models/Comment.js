const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1]
            }
        },
        userId: {
            type: DataTypes.UUID,
            referencee: {
                model: 'user',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.UUID,
            reference: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;