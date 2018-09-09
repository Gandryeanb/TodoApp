const User = require('../models/userModel')
const passEncryptor = require('../helpers/passEncryptor')
const passValidator = require('../helpers/passValidatro')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const emailSender = require('../helpers/emailSender')

class UserController {

    static loginGoogle(req,res) {
        let token = req.headers.token
        let identityUser;
        
        axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
        .then(data => {
            
            identityUser = {
                email : data.data.email,
                name : data.data.name
            }
            return User.find({
                email : identityUser.email
            })
    
        })
        .then(data => {
            
            if (data.length !== 0 && data[0].googleLogin === 1) { // googleLogin
                
                let token = jwt.sign({ 
                    id : data[0]._id,
                    fName : data[0].fName,
                    email: data[0].email
                }, process.env.JWT_SECRET);
                
                res.status(200).json({
                    status : 1,
                    message : `login via google success`,
                    token : token
                })
            } else if (data.length !== 0 && data[0].googleLogin === 0) {
                
                let obj = {
                    googleLogin : 1
                }
                
                User.updateOne({ _id : data[0]._id },{ $set : obj },(err, report) => {
                    
                    if (!err) {
                        let token = jwt.sign({ 
                            id : data[0]._id,
                            fName : data[0].fName,
                            email: data[0].email
                        }, process.env.JWT_SECRET);

                        res.status(200).json({
                            status : 1,
                            message : `updating data and login via google success`,
                            token : token
                        })

                    } else {

                        res.status(500).json({
                            message : 'errors when update data'
                        })
                    }
                })

            } else {
                
                let userData = {
                    email : identityUser.email,
                    fName : identityUser.name,
                    phone : `google-${identityUser.email}`,
                    password : `google-${identityUser.email}`,
                    googleLogin : 1
                }
                
                let user = new User(userData)
                
                user.save(err => {
                    if (!err) {
                        
                        let token = jwt.sign({ 
                            id : user._id,
                            fName : user.fName,
                            email: user.email
                        }, process.env.JWT_SECRET);
                        
                        emailSender(user.email)

                        res.status(200).json({
                            message : `success login and creating data to web and database`,
                            token : token
                        })
                    } else {
                        res.status(500).json({
                            message : `error when creating data`
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err:err
            })
        })
    }

    static getData(req,res) {
        User.find({ _id:req.decoded.id})
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

    static loginFacebook(req,res) {
        
        let accessToken = req.headers.accesstoken
        let valFacebook;
        
        axios.get(`https://graph.facebook.com/me?fields=name,email&access_token=${accessToken}`,{

        })
        .then(response => {
            valFacebook = response

            if (response.data) {
                return User.find({
                    email : response.data.email
                })
                
            } else {
                status(500).json({
                    message : `user not found`
                })
            }
        })
        .then(data => {
            
            if (data.length !== 0 && data[0].facebookLogin === 1) {
                
                let token = jwt.sign({ 
                    id : data[0]._id,
                    fName : data[0].fName,
                    email: data[0].email
                }, process.env.JWT_SECRET);
                
                res.status(200).json({
                    status : 1,
                    message : `login via facebook success`,
                    token : token
                })
            } else if (data.length !== 0 && data[0].facebookLogin === 0) {
                if (!err) {
                    
                    let token = jwt.sign({ 
                        id : data[0]._id, 
                        fName : data[0].fName,
                        email: data[0].email
                    }, process.env.JWT_SECRET);
                    
                    res.status(200).json({
                        status : 1,
                        message : `updating data and login via facebook success`,
                        token : token
                    })

                } else {

                    res.status(500).json({
                        message : 'errors when update data'
                    })
                }
            } else {
                
                req.body = {
                    email : valFacebook.data.email,
                    fName : valFacebook.data.name,
                    phone : `facebook-${valFacebook.data.email}`,
                    password : `facebook-${valFacebook.data.email}`,
                    facebookLogin : 1
                }

                let user = new User(req.body)

                user.save(err => {
                    if (!err) {
                        
                        let token = jwt.sign({ 
                            id : user._id,
                            fName : req.body.fName,
                            email: req.body.email
                        }, process.env.JWT_SECRET);
                        
                        emailSender(user.email)
                        
                        res.status(200).json({
                            message : `success login and creating data to web and database`,
                            token : token
                        })
                    } else {
                        res.status(500).json({
                            message : `error when creating data`
                        })
                    }
                })
            }
        })
        .catch(err => {
            
            status(500).json({
                message : `error when retrieve data user to facebook`
            })
        })
    }

    static login(req, res) {
        
        User.find({
            email : req.body.email
        })
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({
                    message : `Email or Password wrong`
                })
            } else {

                if (passValidator(req.body.password,data[0].password)) {
                    let token = jwt.sign({ 
                        id : data[0]._id,
                        fName : data[0].fName,
                        email: data[0].email,
    
                    }, process.env.JWT_SECRET);
                    
                    res.status(200).json({
                        message : `login success`,
                        token : token
                    })
                } else {
                    res.status(404).json({
                        message : `Email or Password wrong`
                    })
                }

            }
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })

    }

    static createAccount(req,res) {

        let objUser;

        objUser = {
            fName : req.body.fName,
            lName : req.body.lName,
            phone : req.body.phone,
            email : req.body.email,
            password : passEncryptor(req.body.password)
        }
          
        let user = new User(objUser)

        user.save(err => {
            if (!err) {

                emailSender(user.email)

                res.status(201).json({
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

    static profile (req,res) {
        
        User.find({
            _id: req.decoded.id
        })
        .then(data => {
            res.status(200).json({
                status : 1,
                name : data[0].fName
            })
        })
        .catch(err => {
            res.status(500),json({
                message : err.message
            })
        })
    }

}

module.exports = UserController