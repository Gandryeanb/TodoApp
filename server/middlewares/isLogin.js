const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const isLogin = (req, res, next) => {
    
    if (req.headers.token) {
        
        jwt.verify(req.headers.token, process.env.JWT_SECRET, function(err, decoded) {
            if (!err) {
                
                User.find({
                    _id : decoded.id,
                    fName : decoded.fName,
                    email : decoded.email
                })
                .then(data => {
                    if (data.length !== 0) {
                        req.decoded = decoded
                        next()
                    } else {
                        res.status(200).json({
                            status : 0,
                            message : 'you need to login first'
                        })        
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message : 'internal server errors'
                    })    
                })
            } else {
                res.status(200).json({
                    status : 0,
                    message : 'you need to login first'
                })        
            }
        });
    } else {
        res.status(200).json({
            status : 0,
            message : 'you need to login first'
        })
    }
}

module.exports = isLogin