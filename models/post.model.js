const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    previewPic: {
        type: String,
        required: true
    },
    previewVideo: {
        type: String,
        required: true
    },
    detailedVideo: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    },
    {timestamps: true}
)

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;