// require('dotenv').config();
const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/socialmedia_database');
// mongoose.connect(process.env.DB_CONNECTION);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting to Mongo DB"));

db.once('open',function(){
    console.log('Connected to the database');
});

module.exports = db;