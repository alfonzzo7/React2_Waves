const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({entended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//=============================================================
// ROUTES
//=============================================================
app.use(require('./routes/index'));

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});