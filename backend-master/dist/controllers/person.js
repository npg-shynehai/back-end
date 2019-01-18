"use strict";

var PersonService = _interopRequireWildcard(require("../services/person.js"));

var Joi = _interopRequireWildcard(require("joi"));

var Validate = _interopRequireWildcard(require("../models/validate/personvalidate"));

var _application = _interopRequireDefault(require("../config/application"));

var _codes = _interopRequireDefault(require("../models/response/codes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

module.exports = {
  // get all person
  getAllPerson: function getAllPerson(req, res) {
    var limit = _application.default.page.default; // number of records per page

    var offset = 0;
    var page = 1; // page number current
    // Total records

    var totalRows = 0; // call service get all emp

    PersonService.getCountPerson().then(function (data) {
      totalRows = data.count;
      var pages = Math.ceil(parseInt(totalRows) / parseInt(limit)); // Total page

      offset = limit * (page - 1);
      PersonService.getAllPerson(limit, offset).then(function (emp) {
        res.status(_codes.default[200]).send({
          data: emp,
          length: emp.length,
          pages: pages
        });
      }, function () {
        res.status(_codes.default[204]).send({
          message: 'No data',
          data: {}
        });
      });
    }, function (error) {
      res.status(_codes.default[500]).send({
        message: error.message
      });
    });
  },
  // get more person id
  getAllPersonByIdOrPage: function getAllPersonByIdOrPage(req, res, next) {
    var limit = _application.default.page.default; // number of records per page

    var offset = 0; // page number current

    var id = parseInt(req.params.id);
    var page = parseInt(req.params.page); // Gọi service

    if (id === 0 || page === 0) {
      PersonService.getAllPerson(limit, offset).then(function (dataPerson) {
        res.status(_codes.default[200]).send({
          data: dataPerson,
          length: dataPerson.length,
          pages: page
        });
      }, function () {
        res.status(_codes.default[204]).send({
          message: 'No data',
          data: {}
        });
      });
    } else {
      PersonService.getAllPersonWhereById(limit, offset, id).then(function (dataPerson) {
        res.status(_codes.default[200]).send({
          data: dataPerson,
          length: dataPerson.length,
          pages: page
        });
      }, function () {
        res.status(_codes.default[204]).send({
          message: 'No data',
          data: {}
        });
      });
    }
  },
  // add a new employeee
  addNewPerson: function addNewPerson(rep, res) {
    var data = rep.body; // validate input

    var result = Joi.validate(data, Validate.schema, function (err, _value) {
      if (err) return false;
      return true;
    });

    if (result) {
      PersonService.addNewPerson(data).then(function (data) {
        res.status(_codes.default[200]).send({
          data: data.dataValues
        });
      }, function () {
        res.status(_codes.default[500]).send({});
      });
    } else {
      return res.status(_codes.default[400]).send({});
    }
  },
  // delete employee
  deletePerson: function deletePerson(rep, res) {
    // get id
    var id = parseInt(rep.params.id);
    PersonService.getPersonById(id).then(function (data) {
      if (data.length > 0) {
        PersonService.deletePersonById(id).then(function () {
          res.status(_codes.default[200]).send({});
        }, function () {
          res.status(_codes.default[400]).send({});
        });
      } else {
        res.status(_codes.default[404]).send({});
      }
    }, function () {
      res.status(_codes.default[500]).send({});
    });
  },
  // update age person id
  upAgePerson: function upAgePerson(rep, res) {
    var id = parseInt(rep.params.id);
    PersonService.getPersonById(id).then(function (data) {
      // No data
      if (data.length === 0) {
        res.status(_codes.default[500]).send({});
      } else {
        var age = parseInt(data[0].dataValues.age + 1);
        console.log('isResult');

        if (age <= 150) {
          PersonService.updatePerson(id, age).then(function () {
            res.status(_codes.default[200]).send({});
          });
        } else {
          res.status(_codes.default[400]).send({});
        }
      }
    }, function () {
      res.status(_codes.default[500]).send({});
    });
  },
  // down age person id
  downAgePerson: function downAgePerson(rep, res) {
    var id = parseInt(rep.params.id);
    PersonService.getPersonById(id).then(function (data) {
      // No data
      if (data.length === 0) {
        res.status(_codes.default[500]).send({});
      } else {
        var age = parseInt(data[0].dataValues.age - 1);

        if (age >= 15) {
          var isResult = PersonService.updatePerson(id, age);

          if (isResult === 1) {
            res.status(_codes.default[200]).send({});
          } else {
            res.status(_codes.default[204]).send({});
          }
        } else {
          res.status(_codes.default[404]).send({});
        }
      }
    }, function () {
      res.status(_codes.default[500]).send({});
    });
  }
};