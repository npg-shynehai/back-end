"use strict";

var Express = _interopRequireWildcard(require("express"));

var PersonController = _interopRequireWildcard(require("../controllers/person"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var router = Express.Router();
/* GET all person in DB */

router.get('/', PersonController.getAllPerson);
/* GET all person in DB */
// router.get('/:page(\\d+)', PersonController.getAllPerson)

/* Get person where id = min and page = pageCurrent + 1  in DB */

router.get('/:page(\\d+)/:id(\\d+)', PersonController.getAllPersonByIdOrPage);
/* GET id. */
// router.get('/id/:id(\\d+)', PersonController.getByIdPerson)

/* Create  a emp */

router.post('/', PersonController.addNewPerson);
/* Update data in DB */
// router.put('/:id(\\d+)', PersonController.updatePerson)

/* Delete data in DB */

router.delete('/:id(\\d+)', PersonController.deletePerson);
/* Update age person in DB */

router.put('/age-up/:id(\\d+)', PersonController.updateAgePerson);
/* Update age person in DB */

router.put('/age-down/:id(\\d+)', PersonController.updateAgePerson);
module.exports = router;
//# sourceMappingURL=person.js.map