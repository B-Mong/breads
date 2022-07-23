const mongoose = require('mongoose');
const Bread = require('./bread.js');
const { Schema } = mongoose

const bakerSchema = new Schema({
    name: {
        type: String, 
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date, 
        required: true
    },
    bio: {
        type: String
    }
},{toJSON:{virtuals:true}}) // This makes the virtual displayed in the JSON data

// Virtuals
// This virtual populates all the breads that a selected baker has created. 
bakerSchema.virtual('breads', { 
    ref: 'Bread',  // References the bread data from line 2
    localField: '_id', // Database ID
    foreignField: 'baker' // 
})

const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker