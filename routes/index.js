const express = require('express');
const multiparty = require("multiparty");
const router = express.Router();
const cors = require("cors");


router.options('*', cors())
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/send", (req, res) => {

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
      to: '', // receiver email,
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

