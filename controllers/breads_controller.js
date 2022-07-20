// Initializes Express and specifies that this is a express router. 
const express = require('express')
const breads = express.Router()
// Equates our data from the model folder to a variable so we can access it in this file
const Bread = require('../models/bread.js')

// INDEX // Basic READ/GET function and 
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index',
                {
                    breads: foundBreads,
                    title: 'Bread List'
                }
            )
        })
})

// NEW // GET request since we are getting a form. We are not using POST yet since we are not changing anything in the list, only filling out a form 
breads.get('/new', (req, res) => {
    res.render('new')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
        bread: Bread[req.params.indexArray],
        index: req.params.indexArray
    })
})

// Show // Gets data and display it on the Show.jsx html template. 
breads.get('/:arrayIndex', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
            res.send('404')
        })
})

// CREATE // POST because we are taking the data from the form and creating a page. 
breads.post('/', (req, res) => {
    if (!req.body.image) { // If there is no image url specified by the user it will use the image from the schema
        req.body.image = undefined
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.create(req.body) // Pushes our new array of data into the Breads array that we are accessing. From there, it gets added to the data.
    res.redirect('/breads') // Once it pushes the new array, it redirects the user to the bread list, they will be able to see their bread on the list
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.param.indexArray, 1)
    res.status(303).redirect('/breads')
})

// UPDATE 
breads.put('/:arrayIndex', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})

module.exports = breads
