const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({
  create_at: Date,
  login_at: Date,
  google_id: String,
  google_name: String,
  google_token: String,
  google_gmail: String,
  google_photo: String,
  facebook_id: String,
  facebook_name: String,
  facebook_token: String,
  facebook_gmail: String,
  facebook_photo: String,
});

module.exports = mongoose.model("tbl_user", user);
