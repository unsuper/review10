const mongoose = require("mongoose");
const schema = mongoose.Schema;

var music = new mongoose.Schema({
    info:{
        title:String,
        link : String,
        channel:{type:schema.Types.ObjectId,ref: 'tbl_music_channel'},
        description:String,
        thumbnails:{
            default:{
                url:String
             },
             high:{
                 url:String
             }
        }
    },
    moment:{
        create_at:Date,
        update_at:Date,
        delete_at:Date,
    },
    interactive:{
        view:Number,
        evaluate:Number,
    }
    
});

module.exports = mongoose.model("tbl_music", music);
