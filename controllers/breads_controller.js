const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
    res.render('index',
        {
            breads: Bread, // We pull this key of data from line 3 which is the js file that links from the bread.js file which contains the data for the bread
            title: 'Index Page'
        }
    )
    // res.send(Bread)
})

// Show
breads.get('/:arrayIndex', (req, res) => {
    res.render('Show', {
        bread: Bread[req.params.arrayIndex]
    })
})

module.exports = breads
