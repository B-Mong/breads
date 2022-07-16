// Require Mongoose 
const mongoose = require('mongoose');
const { Schema } = mongoose

// Schema for DB (Layout and requirements of how our data in the database should look/need)
const breadSchema = new Schema({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: 'http://placehold.it/500x500.png' }
})

// model and export
// equates a variable to the schema we created. Allowing us to access this db as a variable
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread
