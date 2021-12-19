var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();


const userController = require("../controllers/usersController")


//consulta de usuarios
router.get('/', usersController.getAll);

//Registro
router.post('/', usersController.create);

//Login
router.post('/login', usersController.login);

module.exports = router;
