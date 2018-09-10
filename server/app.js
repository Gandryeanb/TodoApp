require('dotenv').config()
const express = require('express')
const cors = require("cors")
const app = express()
const axios = express('axios')
const port = 3000
const mongoose = require('mongoose');
mongoose.connect(String(process.env.MLAB_CONNECTION));
const db = mongoose.connection;

// ROUTES PATH
const routeUser = require('./routes/user')
const routeActivity = require('./routes/activity')

// JSON AND PARSER
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// ROUTES
app.use('/user/activity',routeActivity)
app.use('/user',routeUser)

// HOME END POINT
app.get('/',(req,res) => {
    res.status(200).json({
        message : 'ON!'
    })
})

// CONSOLE STATUS
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`> Connected to DB MLAB`)
});
app.listen(port,() => {
    console.log(`> Listening to port ${port}`)
}) 