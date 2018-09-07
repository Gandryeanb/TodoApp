const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
mongoose.connect('mongodb://gandryeanb:manusia21!@ds149252.mlab.com:49252/todo');
const db = mongoose.connection;

// ROUTES PATH
const routeUser = require('./routes/user')
const routeActivity = require('./routes/activity')

// JSON AND PARSER
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