
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { pageRouter } = require('./routes');
const { contact } = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/contact', contact);
app.use('/', pageRouter);

app.listen(3000, () => {
  console.log('Server is running at localhost:3000');
});