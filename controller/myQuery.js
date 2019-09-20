const schema = require('../Models/schema');
const mongoose = require('mongoose');
exports.queryData = async (req, res) => {
    data = req.params.userQuery;
    //find image/video data directly

    let fetchDataOfImage = await schema.postModel.aggregate([
        { $match: { postType: "image" } }, { $limit: 5 }
        ,
        {
            $lookup: {
                from: "action", let: { postid: "$_id" }, pipeline: [
                    { $match: { $expr: { $and: [{ $eq: [data, "$userId"] }, { $eq: ["$$postid", "$postId"] }] } } }

                ],
                as: "isLiked"
            }
        },
        { $project: { isLiked: 1, userId: 1, totalComments: 1, _id: 1, postType: 1 } }
    ])
    res.send(fetchDataOfImage)

    //find data using userId

    let fetchSpecificUser = await schema.userModel.aggregate([{ $match: { _id: mongoose.Types.ObjectId(data) } },
    {
        $lookup: {
            from: "posts", let: { userid: "$_id" },
            pipeline: [{
                $match: {
                    $expr: {
                        $and: [{ $eq: ["$userId", "$$userid"] },
                        { $eq: ["$postType", "video"] }]
                    }
                }
            }, { $limit: 5 }],
            as: "result"
        }
    }])
    console.log(fetchSpecificUser)


}
