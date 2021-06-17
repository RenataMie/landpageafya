require("dotenv").config();
var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const nodemailer = require('nodemailer');

const cors = require("cors");

router.use((req,res,next)=>{
  res.setHeader('Acces-Control-Allow-Origin','*');
  res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
  next(); 
})

/* GET users listing. */
router.get('/send', function(req, res, next) {
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
});

router.post("/send", cors(), (req, res) => {

  let form = new multiparty.Form();
  let data = {};

  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      sender: `${data.name} <${data.email}>`,
      to: process.env.EMAIL, // receiver email,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };


    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

module.exports = router;
