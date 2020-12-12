const mongoose = require("mongoose");
const schema = mongoose.Schema;

const follows = new schema({
    create_at:Date,
    movie_id: {type:schema.Types.ObjectId,ref: 'tbl_movie'},
    cast_id:{type:schema.Types.ObjectId,ref: 'tbl_cast'},
    type:String,
    user_id:String,
});

module.exports = mongoose.model("tbl_follow", follows);
