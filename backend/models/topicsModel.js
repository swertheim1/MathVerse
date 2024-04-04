// Import Sequelize module
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with your database connection
const sequelize = new Sequelize('DB_NAME', 'DB_USERNAME', 'DB_PASSWORD', {
    host: 'DB_HOST',
    dialect: 'mysql', 
  });
  

// Define Topics model
const Topic = sequelize.define('Topic', {
  topic_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  topic_name: {
    type: DataTypes.STRING(50),
    unique: true
  },
  grade_level: {
    type: DataTypes.STRING(25)
  }
}, {
  tableName: 'Topics', // Specify the name of the table
  timestamps: false // Set to false if you don't want timestamps fields (createdAt, updatedAt)
});

// Export the Topic model
module.exports = Topic;