// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// app.use('/api/upload-resume', require('./api/upload-resume'));
// app.use('/api/health', require('./api/health-check'));

app.use('*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

module.exports = app;
