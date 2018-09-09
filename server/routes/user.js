const routes = require('express').Router()
const UserController = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

routes.get('/',isLogin,UserController.getData)
routes.put('/',UserController.updateAccout)
routes.post('/register',UserController.createAccount)
routes.post('/login',UserController.login)
routes.get('/profile',isLogin,UserController.profile)
routes.get('/login/facebook',UserController.loginFacebook)
routes.get('/login/google',UserController.loginGoogle)

module.exports = routes