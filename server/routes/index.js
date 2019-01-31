const express = require('express');

const app = express();

app.use(require('./users'));
app.use(require('./categories'));
app.use(require('./products'));
app.use(require('./site'));

module.exports = app;