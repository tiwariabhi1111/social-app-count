const express = require('express');
const app1 = express();
const mongoose = require('mongoose');
const router = express.Router();
const userReg = require('../controller/userRegister');
const actionControl = require('../controller/actionController')
const postControl = require('../controller/postController');
const userLog = require('../controller/userLogin');
const Like = require('../controller/userLike');
const jwtToken = require('../controller/tokenVerify')
const comment = require('../controller/comment')
const report = require('../controller/report')
const query = require('../controller/myQuery')

router.post("/register", userReg.userData);
router.post("/action", actionControl.actionData);
router.post("/post", postControl.post);
router.post("/login", userLog.login1);
router.post("/like/:postid", jwtToken.tokenVerify, Like.likeData);
router.post("/comment/:postid", jwtToken.tokenVerify, comment.commentData);
router.post("/report/:postid", jwtToken.tokenVerify, report.reportData);
router.post("/query/:userQuery", query.queryData);

module.exports = router
