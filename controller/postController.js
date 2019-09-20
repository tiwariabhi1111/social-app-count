const express = require('express');
const app1 = express();
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const schema = require('../Models/schema');
// exports.post = (request, response) => {
exports.post = app1.use('/', (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const tokenBearer = bearer[1];
        req.token = tokenBearer;
        next();
    }
    else {
        res.sendStatus(403);
    }
}, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, data) => {
        if (err) res.sendStatus(403)
        else {
            try {
                userBody = req.body;
                userBody.userId = data.user;
                schema.postModel.create(userBody, (err, responeData) => {
                    if (err) {
                        res.send(err)
                    }
                    else
                        res.send('posted successfully')

                })

            } catch (error) {
                console.log(error.message)
            }
        }

    })


})

