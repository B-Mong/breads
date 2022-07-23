// Initializes Express and specifies that this is a express router. 
const express = require('express')
const breads = express.Router()
// Equates our data from the model folder to a variable so we can access it in this file
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')

// INDEX // Basic READ/GET function 
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
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
        })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
    Baker.find()   // Find all bakers
        .then(foundBakers => {   // Then pass in the bakers along to
            Bread.findById(req.params.id)       // Find all breads
                .then(foundBread =>{        // Then pass in found breads to the render
                    res.render('edit', {        // Render the edit.jsx and pass in data of bakers and breads
                        bread: foundBread,
                        bakers: foundBakers
                    })
                })
        })
})

// Show // Gets data and display it on the Show.jsx html template. 
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .populate('baker')
        .then(foundBread => {
            const bakedBy = foundBread.getBakedBy()
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
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
        .then(deletedBread => {
            res.status(303).redirect('/breads')
        })
})

// UPDATE 
breads.put('/:id', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedBread => {
            res.redirect(`/breads/${req.params.id}`)
        })
})

// Seed route to upload multiple breads into the database
breads.get('/data/seed', (req, res) => {
    Bread.insertMany([
        {
            name: 'Rye',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
        {
            name: 'French',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        },
        {
            name: 'Gluten Free',
            hasGluten: false,
            image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        },
        {
            name: 'Pumpernickel',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        }
    ])
        .then(createdBreads => {
            res.redirect('/breads')
        })
})

module.exports = breads
