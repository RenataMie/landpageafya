require("dotenv").config();
const express = require('express');
const url = require('url');
const nodemailer = require('nodemailer');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Request for contact page recieved');
  res.render('index');
});

router.post('/send', (req, res) => {

  const email = req.body.email;
  const name = req.body.name;
  const message = req.body.message;

  const emailMessage = ` ${name} : ${message}.`;

  console.log(emailMessage);
  res.redirect('/contact_send');

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port:465,
    secure:true,
    // logger: true,
    // debug: true,
    // secureConnection: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }, 
    tls:{
      rejectUnauthorized:false
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var emailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: 'i52 website',
    text: emailMessage
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.redirect('/contact_error');
    } else {
      console.log('Message Sent: ' + info.response);
      console.log('Email Message: ' + emailMessage);
      res.redirect('/contact_send');
    }
  });
});

module.exports = router;