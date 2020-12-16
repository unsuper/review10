const mongoose = require("mongoose");
const schema = mongoose.Schema;

var like = new mongoose.Schema({
    user_id:{type:schema.Types.ObjectId,ref:'tbl_user'},
    chat_id: {type:schema.Types.ObjectId,ref:'tbl_chat'},
});

module.exports = mongoose.model("tbl_like", like);
