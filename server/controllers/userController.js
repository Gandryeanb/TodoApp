const User = require('../models/userModel')

class UserController {

    static getData(req,res) {
        
        User.find({ _id:req.headers.id})
        .then(data => {
            res.status(200).json({
                data : data
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }

    static updateAccout(req,res) {

        User.updateOne({ _id: req.headers.id  }, req.body,(err, report) => {
            if (!err) {
                res.status(200).json({
                    message : `Updating data success`,
                    targetId : req.headers.id,
                    updatedValues : req.body
                })
            } else {
                res.status(500).json({
                    message : err.message
                })
            }
        });
    }

    static createAccount(req,res) {
        
        let objUser = {
            fName : req.body.fName,
            lName : req.body.lName,
            email : req.body.email,
            password : req.body.password
        }

        let user = new User(objUser)

        user.save(err => {
            if (!err) {
                res.status(200).json({
                    message : `success when creating new User`,
                    data : objUser
                })
            } else {
                res.status(500).json({
                    error : err.message
                })
            }
        })

    }

}

module.exports = UserController