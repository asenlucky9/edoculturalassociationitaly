require('dotenv').config();
const { sequelize, Member } = require('./models');

// Log environment variables (excluding sensitive data)
console.log('Environment variables loaded:', {
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT
});

async function testDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');

    // Sync all models with the database
    await sequelize.sync({ force: true });
    console.log('Database tables have been created successfully.');

    // Create a test member
    const member = await Member.create({
      surname: 'Test',
      name: 'User',
      otherName: 'Middle',
      homeAddress: '123 Test Street',
      dob: new Date(),
      townCity: 'Test Town',
      localGovt: 'Test LGA',
      passportId: 'TEST123',
      codiceFiscale: 'TEST456',
      phone: '1234567890',
      nextOfKinName: 'Next Test',
      nextOfKinPhone: '0987654321',
      nextOfKinAddress: '456 Test Avenue',
      nextOfKinCity: 'Test City',
      nextOfKinCountry: 'Test Country',
      isMarried: true,
      partnerName: 'Partner Name',
      childrenCount: 2,
      childrenNames: ['Child 1', 'Child 2'],
      parentsStatus: 'both alive',
      association: 'Test Association',
      criminalRecord: false,
      reason: 'Testing registration',
      agreement: true,
      passportPhoto: 'test-photo-url',
      signedBySecretary: false,
      signedByPresident: false
    });

    console.log('Test member created successfully:', JSON.stringify(member, null, 2));

  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    // Close the connection
    await sequelize.close();
  }
}

testDatabase(); 