import * as PersonService from '../services/person.js'
import * as Joi from 'joi'
import * as Validate from '../models/validate/personvalidate'
import AppConf from '../config/application'
import CodeAPI from '../models/response/codes'

module.exports = {
  // get all person
  getAllPerson: (req, res) => {
    let limit = AppConf.page.default
    // number of records per page
    let offset = 0
    let page = 1 // page number current
    // Total records
    let totalRows = 0
    // call service get all emp
    PersonService.getCountPerson().then((data) => {
      totalRows = data.count
      const pages = Math.ceil(parseInt(totalRows) / parseInt(limit))
      // Total page
      offset = limit * (page - 1)
      PersonService.getAllPerson(limit, offset).then((emp) => {
        res.status(CodeAPI[200]).send({
          data: emp,
          length: emp.length,
          pages: pages
        })
      }, () => {
        res.status(CodeAPI[204]).send({
          message: 'No data',
          data: {}
        })
      })
    }, (error) => {
      res.status(CodeAPI[500]).send({
        message: error.message
      })
    })
  },

  // get more person id
  getAllPersonByIdOrPage: (req, res, next) => {
    let limit = AppConf.page.default
    // number of records per page
    let offset = 0
    // page number current
    let id = parseInt(req.params.id)
    let page = parseInt(req.params.page)
    // Gọi service
    if ((id === 0) || (page === 0)) {
      PersonService.getAllPerson(limit, offset).then((dataPerson) => {
        res.status(CodeAPI[200]).send({
          data: dataPerson,
          length: dataPerson.length,
          pages: page
        })
      }, () => {
        res.status(CodeAPI[204]).send({
          message: 'No data',
          data: {}
        })
      })
    } else {
      PersonService.getAllPersonWhereById(limit, offset, id).then((dataPerson) => {
        res.status(CodeAPI[200]).send({
          data: dataPerson,
          length: dataPerson.length,
          pages: page
        })
      }, () => {
        res.status(CodeAPI[204]).send({
          message: 'No data',
          data: {}
        })
      })
    }
  },

  // add a new employeee

  addNewPerson: (rep, res) => {
    let data = rep.body
    // validate input
    let result = Joi.validate(data, Validate.schema, (err, _value) => {
      if (err) return false
      return true
    })
    if (result) {
      PersonService.addNewPerson(data).then((data) => {
        res.status(CodeAPI[200]).send({
          data: data.dataValues
        })
      }, () => {
        res.status(CodeAPI[500]).send({
        })
      })
    } else {
      return res.status(CodeAPI[400]).send({
      })
    }
  },

  // delete employee
  deletePerson: (rep, res) => {
    // get id
    let id = parseInt(rep.params.id)
    PersonService.getPersonById(id).then((data) => {
      if (data.length > 0) {
        PersonService.deletePersonById(id).then(() => {
          res.status(CodeAPI[200]).send({
          })
        }, () => {
          res.status(CodeAPI[400]).send({
          })
        })
      } else {
        res.status(CodeAPI[404]).send({
        })
      }
    }, () => {
      res.status(CodeAPI[500]).send({
      })
    })
  },

  // update age person id
  upAgePerson: (rep, res) => {
    let id = parseInt(rep.params.id)
    PersonService.getPersonById(id).then((data) => {
      // No data
      if (data.length === 0) {
        res.status(CodeAPI[500]).send({
        })
      } else {
        let age = parseInt(data[0].dataValues.age + 1)
        console.log('isResult')
        if (age <= 150) {
          PersonService.updatePerson(id, age).then(() => {
            res.status(CodeAPI[200]).send({
            })
          })
        } else {
          res.status(CodeAPI[400]).send({
          })
        }
      }
    }, () => {
      res.status(CodeAPI[500]).send({
      })
    })
  },

  // down age person id
  downAgePerson: (rep, res) => {
    let id = parseInt(rep.params.id)
    PersonService.getPersonById(id).then((data) => {
      // No data
      if (data.length === 0) {
        res.status(CodeAPI[500]).send({
        })
      } else {
        let age = parseInt(data[0].dataValues.age - 1)
        if (age >= 15) {
          var isResult = PersonService.updatePerson(id, age)
          if (isResult === 1) {
            res.status(CodeAPI[200]).send({
            })
          } else {
            res.status(CodeAPI[204]).send({
            })
          }
        } else {
          res.status(CodeAPI[404]).send({
          })
        }
      }
    }, () => {
      res.status(CodeAPI[500]).send({
      })
    })
  }
}
