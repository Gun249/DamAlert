const express = require('express');
const router = express.Router();

router.get('/main', (req, res) => {
   res.render('main') 
});

router.get('/map', (req, res) => {
    res.render('map')
});

router.get('/test', (req, res) => {
    res.render('test')
});

router.get('/dam', (req, res) => {
    res.render('dam')
});

router.get('/contact', (req, res) => {
    res.render('contact')
});

router.get('/inquire', (req, res) => {
    res.render('inquire')
});
module.exports = router;