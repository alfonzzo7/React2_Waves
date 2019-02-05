const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({entended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'));

//=============================================================
// ROUTES
//=============================================================
app.use(require('./routes/index'));

// DEFAULT
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});