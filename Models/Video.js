const mongoose = require("mongoose");
const schema = mongoose.Schema;

const video = new schema({
    // status:{type:String,maxlength:300},
    create_at:Date,
    update_at:Date,
    delete_at:Date,
    movie_id:{type:schema.Types.ObjectId,ref: 'tbl_movie'},
    title:{type:String,minlength:5},
    position:Number,
    link:String,
    type_source:String,

});

module.exports = mongoose.model("tbl_video", video);
