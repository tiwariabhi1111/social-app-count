const express = require('express');
const app1 = express();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const tkn = require('./tokenVerify')
const schema = require('../Models/schema');

exports.commentData = (req, res1, next) => {

    var data = {
        postId: req.params.postid,
        userId: tkn.tokenData.user,
        comment: req.body.message,
        postType: "comment"
    }
    postid = data.postId;
    schema.actionModel.create(data, (err, responeData) => {
        if (err) {
            res.send(err)
        }
        else {

            schema.postModel.updateOne({ _id: postid }, { $inc: { totalComments: 1 } }, (err, res) => { res1.send('comment done') })
        }

    })

}
