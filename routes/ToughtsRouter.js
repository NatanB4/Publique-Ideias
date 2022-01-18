const express = require('express')
const router = express.Router();
const ToughtsController = require('../controllers/ToughtsController');

//helpers
const checkAuth = require('../helpers/auth').checkAuth

//add
router.get('/add', checkAuth, ToughtsController.createToughts)
router.post('/add', checkAuth, ToughtsController.createToughtsSave)

//edit
router.get('/edit/:id', checkAuth, ToughtsController.updatedTought)
router.post('/edit', checkAuth, ToughtsController.updatedToughtSave)

//dashboard
router.get('/dashboard', checkAuth, ToughtsController.dashboard)

router.post('/remove', checkAuth, ToughtsController.removeTought)
router.get('/', ToughtsController.showAll)

module.exports = router;