const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const numberSets = sequelize.define('NumberSets', {
    numberSet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numberSet_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    grade_level: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    tableName: 'numbersets',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['numberSet_name', 'grade_level']
        }
    ]
});

module.exports = numbersSets;
