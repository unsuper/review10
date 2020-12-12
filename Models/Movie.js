const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Movie = new schema({
    name: { type: String, minlength: 1, maxlength: 900, index: true },
    directer: { type: String, minlength: 2, },
    status: Number,
    create_at: Date,
    update_at: Date,
    delete_at: Date,
    trailer: String,
    screenwriter: { type: String, minlength: 2, },
    country: { type: String, minlength: 2,  },
    language: { type: String, minlength: 2,  },
    years: { type: String, minlength: 2,  },
    duration: { type: Number, minlength: 1, maxlength: 9 },
    episode: { type: Number },
    score: Number,
    introduction: { type: String, minlength: 2 },
    cover_img: { type: String, minlength: 2,  },
});

module.exports = mongoose.model("tbl_movie", Movie);
