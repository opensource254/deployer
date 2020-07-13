const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const web = express();

web.use(logger('dev'));
web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(cookieParser());
web.use(express.static(path.join(__dirname, 'public')));

web.use('/', indexRouter);
web.all('*', (req, res) => {
    res.status(404).json({ type: 'Error', message: `Sorry ${req.method} ${req.path} is not available` })
})

module.exports = web;
