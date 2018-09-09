const Activity = require('../models/activityModel')
const dataSort = require('../helpers/dataSort')
const dataSortUnique = require('../helpers/dataSortUnique')

class ActivityController {

    static createActivity(req,res) {
        
        let objActivity = {
            userId : req.decoded.id,
            name : req.body.name,
            description : req.body.description,
            dueDate : new Date(req.body.date)
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
        
        let obj;

        if  (req.body.date && req.body.date !== '') {
            obj = {
                name : req.body.name,
                description : req.body.description,
                dueDate : new Date(req.body.date)
            }
        } else {
            obj = {
                name : req.body.name,
                description : req.body.description
            }
        }
        
        Activity.updateOne({ _id : req.body.id },{ $set : obj },(err, report) => {
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
        Activity.deleteOne({_id : req.params.id }, function (err) {
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

    static undoneActivity(req,res) {
        Activity.find({ userId : req.decoded.id, status:0})
        .then(datas => {    
            let datasFinal = dataSort('ASC',datas)
            let datasFix = dataSortUnique(datasFinal)
            
            res.status(200).json({
                data : datasFix
            })
        })
        .catch(err => {
            res.status(200).json({
                message : err.message
            })
        })
    }

    static doneActivity(req,res) {

        Activity.find({ userId : req.decoded.id, status:1})
        .then(datas => {   

            let datasFinal = dataSort('DSC',datas)
            let datasFix = dataSortUnique(datasFinal)

            res.status(200).json({
                data : datasFix
            })
        })
        .catch(err => {
            res.status(200).json({
                message : err.message
            })
        })

    }

    static markDone(req, res) {

        let obj = {
            status : 1
        }

        Activity.updateOne({ _id : req.body.id },{ $set : obj }, (err, report) => {
            if (!err) {
                res.status(200).json({
                    message : `Updating data success`,
                    userId : req.headers.id,
                    updatedValues : obj
                })
            } else {
                res.status(500).json({
                    message : err.message
                })
            }
        })
    }

}

module.exports = ActivityController