const routes = require('express').Router()
const ActivityController = require('../controllers/activityController')
const isLogin = require('../middlewares/isLogin')

routes.post('/', isLogin,ActivityController.createActivity)
routes.put('/',isLogin,ActivityController.updateActivity)
routes.delete('/:id',isLogin,ActivityController.deleteActivity)
routes.get('/undone', isLogin,ActivityController.undoneActivity)
routes.get('/done', isLogin,ActivityController.doneActivity)
routes.put('/done',isLogin,ActivityController.markDone)

module.exports = routes