const express = require('express');
const app = express();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
exports.tokenVerify = (req, res, next) => {

    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const tokenBearer = bearer[1];
        req.token = tokenBearer;
        jwt.verify(req.token, "secretkey", (err, data) => {

            if (err) res.sendStatus(403)
            else {
                exports.tokenData = data;
                console.log('verified')
                next()
            }

        })
    }
}
