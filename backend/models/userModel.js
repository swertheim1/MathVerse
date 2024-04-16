// Import Sequelize
import { DataTypes, Sequelize } from 'sequelize';

// Initialize Sequelize with your database connection
const sequelize = new Sequelize('DB_NAME', 'DB_USERNAME', 'DB_PASSWORD', {
  host: 'DB_HOST',
  dialect: 'mysql', 
});

// Define the User model
const User = sequelize.define('Users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  },
  grade: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(20)
  },
  status: {
    type: DataTypes.STRING(20)
  },
  password_reset_token: {
    type: DataTypes.STRING(255)
  },
  password_reset_token_expires: {
    type: DataTypes.DATE
  }
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('User model synchronized with database');
  })
  .catch(err => {
    console.error('Error synchronizing User model:', err);
  });

// Export the User model
export default User;