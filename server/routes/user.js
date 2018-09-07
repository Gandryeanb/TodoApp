const routes = require('express').Router()
const UserController = require('../controllers/userController')

routes.get('/',UserController.getData)
routes.put('/',UserController.updateAccout)
routes.post('/register',UserController.createAccount)

module.exports = routes