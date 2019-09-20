const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//userSchema
var userSchema = new Schema({
    name: { type: String, required: [true, 'blank data not accepted'] },

    email: { type: String, unique: true, required: true },
    password: String,
    phone: Number,
    dateCreated: { type: Date, default: Date.now }
});
exports.userModel = mongoose.model('user', userSchema);

//postUserSchema
var postSchema = new Schema({
    postType: {
        type: String,
        enum: ['image', 'video'],
    },
    postDate: { type: Date, default: Date.now },
    title: String,
    userId: { type: mongoose.Schema.Types.ObjectId },
    postId: { type: mongoose.Schema.Types.ObjectId },
    totalComments: { type: Number, default: 0 },
    totalLinkes: { type: Number, default: 0 },
    myLike: { type: Boolean, default: false }
});
exports.postModel = mongoose.model('posts', postSchema);

//actionSchema
var actionSchema = new Schema({
    postType: {
        type: String,
        enum: ['comment', 'like', "report"],
    },
    actionDate: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    comment: { type: String, default: null }
});
exports.actionModel = mongoose.model('action', actionSchema);
