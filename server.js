// Configuration
// Initilizes what framework we are using and sets env variables for the overall project
const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT
const app = express();
// DEPENDENCIES
const methodOverride = require('method-override')


// MIDDLEWARE (View engine we are using)
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
// Middle warefrom Express that allows us to change strings into a object. Is being used in the /controllers/js Create method
// When data is being sent over, it gets encrypted and needs to be changed into a object for the next thing to use
app.use(express.urlencoded({extended: true}))
// Allows us to override methods when making making requests. We are using this to force a form to make a delete request since they only make POST requests
app.use(methodOverride('_method'))




// Adds css into our express project and sets the directory for where the css file is /public folder
app.use(express.static('public'))


// Routes
// This is just the basic homepage route
app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Bread!')
});

// Listen
app.listen(PORT, ()=>{
    console.log('nomming at port', PORT)
})

// Controllers are used for routing to other pages/views we create
// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// * is used as a catch all for all other routes that were not specified/created. Meaning we can display and create our own 404 page
// 404 Page Not Found
app.get('*', (req, res) =>{
    res.send('404')
})
