const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cast_movie = new schema({
    status:String,
    create_at:Date,
    update_at:Date,
    delete_at:Date,
    cast_id:{type:schema.Types.ObjectId,ref: 'tbl_cast'},
    movie_id:{type:schema.Types.ObjectId,ref: 'tbl_movie'},
});

module.exports = mongoose.model("tbl_cast_movie", cast_movie);
