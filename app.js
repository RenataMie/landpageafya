require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const cors = require("cors");


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use((req,res,next)=>{
  res.setHeader('Acces-Control-Allow-Origin','*');
  res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
  next(); 
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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

module.exports = app;
