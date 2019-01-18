"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountPerson = getCountPerson;
exports.getAllPerson = getAllPerson;
exports.getAllPersonWhereById = getAllPersonWhereById;
exports.getPersonById = getPersonById;
exports.addNewPerson = addNewPerson;
exports.deletePersonById = deletePersonById;
exports.updatePerson = updatePerson;

var _models = _interopRequireDefault(require("../db/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sequelize = require('sequelize');

var Op = Sequelize.Op; // get count person

function getCountPerson() {
  var data = _models.default.Person.findAndCountAll();

  return data;
} // get all person


function getAllPerson(limit, offset) {
  return _models.default.Person.findAll({
    offset: offset,
    limit: limit,
    order: [['id', 'DESC']]
  });
} // get more person with id min


function getAllPersonWhereById(limit, offset, id) {
  return _models.default.Person.findAll({
    where: {
      id: _defineProperty({}, Op.lt, id)
    },
    offset: offset,
    limit: limit,
    order: [['id', 'DESC']]
  });
} // get person with id


function getPersonById(id) {
  return _models.default.Person.findAll({
    where: {
      id: id
    }
  });
} // add new person


function addNewPerson(data) {
  return _models.default.Person.create(data);
} // delete person with id


function deletePersonById(id) {
  return _models.default.Person.destroy({
    where: {
      id: id
    }
  });
} // update age person


function updatePerson(id, inputage) {
  return _models.default.Person.update({
    age: inputage
  }, {
    where: {
      id: id
    }
  });
}