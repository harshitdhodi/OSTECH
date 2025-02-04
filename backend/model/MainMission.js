// mission.model.js
const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: [{
        type: String,
       
    }],
    alt:[{type:String}],
    imgTitle:[{type:String ,
        required: true} ],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Mission = mongoose.model('MyMission', missionSchema);

module.exports = Mission;
