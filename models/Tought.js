const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = require('./User')

const Tought = db.define('Toughts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    like: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
})

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;