const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const Route = require('./routes/router')
mongoose.set('debug', true)

mongoose.connect('mongodb://localhost:27017/myPost', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongodb connected")
})
    .catch(err => {
        console.log(err.message)
    })
app.use('/user', Route);
app.listen(4000, () => {
    console.log('server on', 7000)
}) 
