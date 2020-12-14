const Chat = require("../Models/chat");
const User = require("../Models/User");
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
  let chatData = await Chat.find(
    { movie_id: req.params.movie_id },
    function (err, data) {
      if (err) {
        res.json({
          result: false,
          message: "get all chat fail ! " + err.message,
          items: [],
        });
      }
      return data;
    }
  );

  await chatData.map((val, ind) => {
    let allData = [];
    User.find({ _id: val.user_id }, function (err, data) {
      if (err) {
        res.json({
          result: false,
          message: "get all chat fail ! " + err.message,
          items: [],
        });
      }

      data.map((info, index) => {
        allData.push({
          chat_id: val._id,
          content: val.message,
          create_at: val.create_at,
          update_at: val.update_at,
          userinfo: {
            user_id: val.user_id,
            gg_name: info.google_name,
            gg_img: info.google_photo,
            fb_name: info.facebook_name,
            fb_img: info.facebook_photo,
          },
        });
      });

      if (ind === chatData.length - 1) {
        res.json({
          status: true,
          data: allData,
        });
      }
    });
  });
};
