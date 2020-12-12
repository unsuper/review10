const mongoose = require("mongoose");
const schema = mongoose.Schema;

const history = new schema({
    create_at:Date,
    movie_id: {type:schema.Types.ObjectId,ref: 'tbl_movie'},
    video_id:{type:schema.Types.ObjectId,ref: 'tbl_video'},
    duration:Number,
    user_id:String,
});

module.exports = mongoose.model("tbl_history", history);
