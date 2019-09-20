const express = require('express');
const app1 = express();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const tkn = require('./tokenVerify')
const schema = require('../Models/schema');

exports.likeData = async (req, res1, next) => {

    var data = {
        postId: req.params.postid,
        userId: tkn.tokenData.user,
        postType: "like"

    }
    likecontent = "like"
    try {
        let userLikeId = data.userId;
        let postLikeid = data.postId;
        var queryData = await schema.actionModel.findOne({ postType: likecontent, userId: userLikeId, postId: postLikeid }).exec();
        if (queryData == null) {
            var myLikeData = await schema.postModel.findOne({ _id: postLikeid, userId: userLikeId }).exec();
            if (myLikeData) {
                try {
                    let data = await schema.postModel.updateOne({ _id: postLikeid }, { "$set": { "myLike": true } }).exec()
                }
                catch (err) { console.log(err) }
                console.log('hello')
            }
            schema.actionModel.create(data, async (err, responeData) => {
                if (err) {
                    res.send(err)
                }
                else {
                    schema.postModel.updateOne({ _id: postLikeid }, { $inc: { totalLinkes: 1 } }, (err, res) => { res1.send('like done') })
                }

            })
        }
        else {
            var myLikeData = await schema.postModel.findOne({ _id: postLikeid, userId: userLikeId }).exec();
            if (myLikeData) {
                try {
                    await schema.postModel.updateOne({ _id: postLikeid }, { "$set": { "myLike": false } }).exec()
                }
                catch (err) { console.log(err) }

            }

            let x = await schema.actionModel.deleteOne({ postId: postLikeid }).exec();
            schema.postModel.updateOne({ _id: postLikeid }, { $inc: { totalLinkes: -1 } }, (err, res) => { res1.send('unlike done') })
        }
    } catch (err) {
        res1.send(err);
    }

}