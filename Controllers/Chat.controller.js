const Chat = require("../Models/chat");
const moment = require("moment");

exports._addChat = async (req, res) => {
  let chat = new Chat({
    movie_id: req.body.movie_id,
    user_id: req.body.user_id,
    message: req.body.message,
    create_at: moment().format("YYYY-MM-DD HH:mm"),
    update_at: null,
  });

  await chat.save(function (err, data) {
    if (err) {
      res.json({
        result: false,
        position: 1,
        message: "check data evaluate fail " + err.message,
      });
    } else {
      res.json({
        data: data,
      });
    }
  });
};

exports._getAll = async (req, res) => {
  await Chat.find({}, function (err, data) {
    if (err) {
      res.json({
        result: false,
        message: "get all chat fail ! " + err.message,
        items: [],
      });
    } else {
      res.json({
        result: true,
        message: "get all chat ok!",
        items: data,
      });
    }
  });
};
