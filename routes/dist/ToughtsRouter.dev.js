"use strict";

var express = require('express');

var router = express.Router();

var ToughtsController = require('../controllers/ToughtsController'); //helpers


var checkAuth = require('../helpers/auth').checkAuth; //add


router.get('/add', checkAuth, ToughtsController.createToughts);
router.post('/add', checkAuth, ToughtsController.createToughtsSave); //edit

router.get('/edit/:id', checkAuth, ToughtsController.updatedTought);
router.post('/edit', checkAuth, ToughtsController.updatedToughtSave); //dashboard

router.get('/dashboard', checkAuth, ToughtsController.dashboard);
router.post('/remove', checkAuth, ToughtsController.removeTought);
router.get('/', ToughtsController.showAll);
module.exports = router;