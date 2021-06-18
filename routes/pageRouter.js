const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Request for home recieved');
  res.render('index');
});


router.get('/contact_send', (req, res) => {
  console.log('Request for contact send page recieved');
  res.render('contact_send');
});

router.get('/contact_error', (req, res) => {
  console.log('Request for contact error page recieved');
  res.render('contact_error');
});

module.exports = router;