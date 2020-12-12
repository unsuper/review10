const mongoose = require("mongoose");
const schema = mongoose.Schema;

var channel = new mongoose.Schema({
    key:{
        kind:String,
    },
    info : {
        title:String,
        des:String,
        photo:{
            default:{
                url:String
            },
            high:{
                url:String
            }
        },
    },
    date:{
        create_at:Date,
        update_at:Date,
        delete_at:Date,
    },
    amount:{
        number:Number,
    }
});

module.exports = mongoose.model("tbl_music_channel", channel);
