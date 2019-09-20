const express = require('express');
const app1 = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const schema = require('../Models/schema');

exports.login1 = async (request, response) => {
    try {

        var data = await schema.userModel.findOne({ email: request.body.email }).exec()
        let userid = data._id;

        if (data) {

            temp = await bcrypt.compare(request.body.password, data.password); // true
            if (temp) {
                userId = {
                    user: userid
                }
                jwt.sign(userId, 'secretkey', (err, token) => {

                    if (!err) response.send(token)
                })

            }
            else {
                response.send('incorrect')
            }

        }
        else {
            response.send('error not match')
        }

    } catch (error) {
        console.log(error.message)
    }
}
