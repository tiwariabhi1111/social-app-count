const express = require('express');
const app1 = express();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const tkn = require('./tokenVerify')
const schema = require('../Models/schema');

exports.reportData = async (req, res, next) => {

    var data = {
        postId: req.params.postid,
        userId: tkn.tokenData.user,
        report: req.body.message,
        comment: req.body.comment,
        postType: "report"
    }
    var reportData = await schema.actionModel.findOne({ postType: "report", userId: data.userId, postId: data.postId }).exec();
    if (reportData == null) {
        schema.actionModel.create(data, (err, responeData) => {
            if (err) {
                res.send(err)
            }
            else
                res.send('you reported');
        })
    }
    else {
        res.send('you have alredy reported ')
    }
}
