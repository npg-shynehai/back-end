'use strict';

module.exports = function (sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});

  Person.associate = function (models) {// associations can be defined here
  };

  return Person;
};
//# sourceMappingURL=person.js.map