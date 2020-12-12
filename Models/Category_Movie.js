const mongoose = require("mongoose");
const schema = mongoose.Schema;

const category_movie = new schema({
    status:String,
    create_at:Date,
    update_at:Date,
    delete_at:Date,
    category_id:{type:schema.Types.ObjectId,ref: 'tbl_category'},
    movie_id:{type:schema.Types.ObjectId,ref: 'tbl_movie'},
});

module.exports = mongoose.model("tbl_category_movie", category_movie);
