const mongoose = require("mongoose");
const schema = mongoose.Schema;

const category = new schema({
    name:{type:String,minlength:5,maxlength:100},
    position:Number,
    status:{type:String},
    create_at:Date,
    update_at:Date,
    delete_at:Date,

});

module.exports = mongoose.model("tbl_category", category);
