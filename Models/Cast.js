const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cast = new schema({
    name:String,
    cover_image:String,
    birthday:Date,
    nation:String,
    create_at:Date,
    update_at:Date,
    delete_at:Date,
    view:Number,
    story:String,
});

module.exports = mongoose.model("tbl_cast", cast);
