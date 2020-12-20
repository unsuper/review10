const mongoose = require("mongoose");
const schema = mongoose.Schema;

var views = new mongoose.Schema({
    movie_id:{type:schema.Types.ObjectId,ref:'tbl_movie'},
    count:Number,
});

module.exports = mongoose.model("tbl_views", views);
