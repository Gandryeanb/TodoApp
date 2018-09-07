const routes = require('express').Router()
const ActivityController = require('../controllers/activityController')

routes.post('/',ActivityController.createActivity)
routes.put('/',ActivityController.updateActivity)
routes.delete('/:id',ActivityController.deleteActivity)
routes.get('/',ActivityController.findAll)

module.exports = routes