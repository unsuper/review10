const mongoose = require("mongoose");
const schema = mongoose.Schema;

var chat = new mongoose.Schema({
    movie_id: {type:schema.Types.ObjectId,ref: 'tbl_movie'},
    user_id:{type:schema.Types.ObjectId,ref:'tbl_user'},
    message:String,
    create_at:Date,
    update_at:Date,
});

module.exports = mongoose.model("tbl_chat", chat);
