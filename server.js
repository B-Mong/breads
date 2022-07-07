const express = require('express');



// Configuration

require('dotenv').config();
const PORT = process.env.PORT
const app = express();

// Routes
app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Bread!')
});

// Listen

app.listen(PORT, ()=>{
    console.log('nomming at port', PORT)
})

// Breads

const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

