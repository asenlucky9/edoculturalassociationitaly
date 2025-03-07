const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Member = sequelize.define('Member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    homeAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    townCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localGovt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passportId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    codiceFiscale: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isMarried: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    partnerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    childrenCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    childrenNames: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const value = this.getDataValue('childrenNames');
        return value ? value.split(',') : [];
      },
      set(val) {
        if (Array.isArray(val)) {
          this.setDataValue('childrenNames', val.join(','));
        } else {
          this.setDataValue('childrenNames', val);
        }
      }
    },
    parentsStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    association: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    criminalRecord: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    agreement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    passportPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    signedBySecretary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    signedByPresident: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    timestamps: true,
  });

  return Member;
};

