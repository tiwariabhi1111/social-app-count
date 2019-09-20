const express = require('express');
const app1 = express();
const mongoose = require('mongoose');
const schema = require('../Models/schema');

exports.actionData = (request, response) => {
    try {
        schema.actionModel.create(request.body, (err, responeData) => {
            if (err) {
                response.send(err)
            }
            else
                response.send('action created..')
        })
    } catch (error) {
        console.log(error.message)
    }
} 