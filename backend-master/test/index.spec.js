import { describe, it, before } from 'mocha'
import { expect, assert } from 'chai'
import * as sequelizeFixtures from 'sequelize-fixtures'
import model from '../db/models'
let server = require('../bin/www')
const request = require('supertest')

describe('Person API Testing', function () {
  before(function () {
  })

  describe('/GET person', () => {
    it('Testing get person', function (done) {
      model.sequelize.sync()
      sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
        request(server)
          .get('/person')
          .end(function (_err, res) {
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.an('object')
            assert(res.body.length === 3, 'invalid length return')
            done()
          })
      })
    })
  })
  describe('/Post person', () => {
    it('Testing post person', function (done) {
      let person = {
        name: 'Test',
        age: 20,
        comment: 'dev'
      }
      model.sequelize.sync()
      sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
        request(server)
          .post('/person')
          .send(person)
          .end(function (_err, res) {
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.an('object')
            assert.typeOf(person.name, 'string', 'name is a string')
            assert.typeOf(person.age, 'number', 'age is a number')
            assert.typeOf(person.comment, 'string', 'comment is a string')
            done()
          })
      })
    })
    it('Testing post person without comment', function (done) {
      let person = {
        name: 'Test',
        age: 20
      }
      model.sequelize.sync()
      sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
        request(server)
          .post('/person')
          .send(person)
          .end(function (_err, res) {
            expect(res.statusCode).to.equal(500)
            done()
          })
      })
    })
  })
  describe('/update age+ person', () => {
    it('Testing update age+ person', function (done) {
      model.sequelize.sync()
      sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
        var id = 1
        request(server)
          .put('/person/age-up/' + id)
          .end(function (_err, res) {
            expect(res.statusCode).to.equal(204)
            done()
          })
      })
    })
  })
  describe('/update age- person', () => {
    it('Testing update age- person', function (done) {
      model.sequelize.sync()
      sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
        var id = 1
        request(server)
          .put('/person/age-down/' + id)
          .end(function (_err, res) {
            expect(res.statusCode).to.equal(204)
            done()
          })
      })
    })
  })
  describe('/delete person', () => {
    it('Testing delete person', function (done) {
      let id = 1
      model.sequelize.sync()
      sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
        request(server)
          .delete('/person/' + id)
          .end(function (_err, res) {
            expect(res.statusCode).to.equal(200)
            assert.typeOf(id, 'number', 'id is a number')
            done()
          })
      }).catch(done())
    })
  })
  describe('/load more person', () => {
    it('Testing load more person', function (done) {
      let id = 1
      let page = 1
      model.sequelize.sync()
      sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
        request(server)
          .get('/person/' + page + '/' + id)
          .end(function (_err, res) {
            expect(res.statusCode).to.equal(200)
            assert.typeOf(id, 'number', 'id is a number')
            assert.typeOf(page, 'number', 'page is a number')
            expect(res.body).to.be.a('array')
            assert(res.body.length === 2, 'invalid length return')
            done()
          })
      }).catch(done())
    })
  })
  describe('/load new person', () => {
    it('Testing load new person', function (done) {
      model.sequelize.sync()
      sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
        request(server)
          .get('/person/')
          .end(function (_err, res) {
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.an('object')
            assert(res.body.length === 3, 'invalid length return')
            done()
          })
      }).catch(done())
    })
  })
})
