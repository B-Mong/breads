const express = require('express');



// Configuration

require('dotenv').config();
const PORT = process.env.PORT
const app = express();


// MIDDLEWARE (View engine we are using)
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
// Adds css
app.use(express.static('public'))

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


// 404 Page Not Found
app.get('*', (req, res) =>{
    res.send('404')
})
