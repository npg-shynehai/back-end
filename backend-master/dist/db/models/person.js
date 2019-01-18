'use strict';

module.exports = function (sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    tableName: 'Person'
  });

  Person.associate = function (models) {// associations can be defined here
  };

  return Person;
};