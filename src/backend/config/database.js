const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('edoculturalassociationitaly', 'postgres', 'mother4me', {
  host: 'localhost',
  port: 5001,
  dialect: 'postgres',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.original?.code,
      address: error.original?.address,
      port: error.original?.port
    });
  }
};

testConnection();

module.exports = sequelize; 