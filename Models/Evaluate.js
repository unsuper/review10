const mongoose = require("mongoose");
const schema = mongoose.Schema;

var evaluate = new mongoose.Schema({
    user_id:{type:schema.Types.ObjectId,ref:'tbl_user'},
    movie_id: {type:schema.Types.ObjectId,ref: 'tbl_movie'},
    score:{type:Number,min:0,max:5},
    create_at:Date,
    update_at:Date,

});

module.exports = mongoose.model("tbl_evaluate", evaluate);
