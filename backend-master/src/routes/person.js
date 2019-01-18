import * as Express from 'express'
import * as PersonController from '../controllers/person'

const router = Express.Router()
/* GET all person in DB */
router.get('/', PersonController.getAllPerson)

/* Get person where id = min and page = pageCurrent + 1  in DB */
router.get('/:page(\\d+)/:id(\\d+)', PersonController.getAllPersonByIdOrPage)

/* Create  a emp */
router.post('/', PersonController.addNewPerson)

/* Delete data in DB */
router.delete('/:id(\\d+)', PersonController.deletePerson)

/* Update age person in DB */
router.put('/:id(\\d+)/age-up', PersonController.upAgePerson)

/* Update age person in DB */
router.put('/:id(\\d+)/age-down', PersonController.downAgePerson)

module.exports = router
