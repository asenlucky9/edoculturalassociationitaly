const sequelize = require('../config/database');

// Import Member model
const Member = require('./Member')(sequelize);

// Export models
module.exports = {
  sequelize,
  Member
}; 