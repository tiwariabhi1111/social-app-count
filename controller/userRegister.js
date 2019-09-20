const express = require('express');
const app1 = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
app1.use(express.json());
const schema = require('../Models/schema');

exports.userData = (request, response) => {
    try {

        userBody = request.body;
        var password = bcrypt.hashSync(userBody.password, 10)
        userBody.password = password;

        schema.userModel.create(userBody, (err, responeData) => {
            if (err) {
                response.send("user already registered")
            }
            else
                response.send('user registered')
        })


    } catch (error) {
        console.log(error.message)
    }
}


