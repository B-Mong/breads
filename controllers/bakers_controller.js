// Dependencies
const express = require('express');
const baker = express.Router();
const Baker = require('../models/baker.js');
const bakerSeedData = require('../models/baker-seed.js');

// Index
baker.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

// Show
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})


// Seed data
baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})




// Export 
module.exports = baker
