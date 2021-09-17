const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use('*', cors());

const port = process.env.PORT || 5000;

//express routing
app.use(express.static('public'));
app.use(express.json())

//sets static page routing for all homeless requests
app.use(express.static(path.join(__dirname, '../build')));

//MongoDB connection setup
const uri = process.env.ATLASS_URI;
mongoose.connect(uri, {useNewURLParser: true, useCreateIndex: true, useUnifiedTopology: true}
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection up and running!")
})

//routes for dbase
const scoresRouter = require('.routes/scores.js');

//routes for models
app.use('./scores', scoresRouter);

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '../pubic', 'index.html'))
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})