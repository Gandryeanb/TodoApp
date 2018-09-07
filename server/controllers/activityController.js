const Activity = require('../models/activityModel')

class ActivityController {

    static createActivity(req,res) {
        
        let objActivity = {
            userId : req.headers.id,
            name : req.body.name,
            description : req.body.description,
            dueDate : new Date(req.body.dueDate)
        }

        let activity = new Activity(objActivity)

        activity.save(err => {
            if (!err) {
                res.status(200).json({
                    message : `success when creating new Activity`,
                    data : objActivity
                })
            } else {
                res.status(500).json({
                    error : err.message
                })
            }
        })
    }

    static updateActivity(req, res) {

        Activity.updateOne({ userId: req.headers.id  }, req.body,(err, report) => {
            if (!err) {
                res.status(200).json({
                    message : `Updating data success`,
                    userId : req.headers.id,
                    updatedValues : req.body
                })
            } else {
                res.status(500).json({
                    message : err.message
                })
            }
        })

    }

    static deleteActivity(req, res) {

        Activity.deleteOne({ userId: req.headers.id, _id : req.params.id  }, function (err) {
            if (!err) {
                res.status(200).json({
                    message : `Deleting activity with ID ${req.params.id} success`
                })
            } else {
                res.status(500).json({
                    message : err.message
                })
            }
        });
    }

    static findAll(req,res) {

        Activity.find({ userId : req.headers.id})
        .then(datas => {
            res.status(200).json({
                data : datas
            })
        })
        .catch(err => {
            res.status(200).json({
                message : err.message
            })
        })
    }

}

module.exports = ActivityController