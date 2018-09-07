const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    userId : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    name: String,
    description: String,
    status: {
        type : Number,
        default: 0
    },
    dueDate: Date
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity