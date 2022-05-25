const { UUIDV4, Model, DataTypes} = require('sequelize');
const sequelize = require('../config');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'User',
        hooks: {
            beforeCreate: async (user) =>{
                const hashPassword = await bcrypt.hash(user.password, 10);
                user.email = user.email.toLowerCase();
                user.password = hashPassword;
                return user;
            },
            beforeUpdate: async (user) =>{
                user.email = user.email.toLowerCase();
                return user;
            }
        },
    });

    module.exports = User;