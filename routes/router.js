const express = require('express');
const router = express.Router()
const Controller  = require('../controllers/controller')
//initailize Controller 
const controller = new Controller();

router.get('/', controller.homePage );
router.get('/add_patient', controller.addPatient_Page);
router.get('/add_hospital', controller.addhospital_Page);
router.post('/add_hospital' , controller.addHospital);
router.post('/add_patient' , controller.addPatient);

module.exports = router