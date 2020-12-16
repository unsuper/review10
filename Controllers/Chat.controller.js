const Chat = require("../Models/chat");
const User = require("../Models/User");
const Like = require("../Models/like");
const Evaluate = require("../Models/Evaluate");
const moment = require("moment");
var clone = require("clone");

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

  let evaluateData = await Evaluate.find(
    { movie_id: req.params.movie_id },
    function (err, data) {
      if (err) {
        res.json({
          result: false,
          message: "get all evalData fail ! " + err.message,
          items: [],
        });
      } else {
        return data;
      }
    }
  );

  let allData = [];
  let likeData = [];
  await chatData.map((val, ind) => {
    Like.countDocuments({ chat_id: val._id }, function (err, data) {
      if (err) {
        res.json({
          status: -1,
          message: err,
        });
      }
      if (data > 0) {
        if (likeData.length === 0) {
          likeData[0] = {
            chat_id: val._id,
            count: data,
          };
        } else {
          likeData.push({
            chat_id: val._id,
            count: data,
          });
        }
      }
    });

    User.find({ _id: val.user_id }, function (err, data) {
      if (err) {
        res.json({
          result: false,
          message: "get all chat fail ! " + err.message,
          items: [],
        });
      }
      if (ind === 0) {
        allData[0] = {
          chat_id: val._id,
          content: val.message,
          create_at: val.create_at,
          update_at: val.update_at,
          userinfo: {
            user_id: val.user_id,
            gg_name: data[0].google_name,
            gg_img: data[0].google_photo,
            gg_id: data[0].google_id,
            fb_name: data[0].facebook_name,
            fb_img: data[0].facebook_photo,
            fb_id: data[0].facebook_id,
          },
        };
      } else {
        allData.push({
          chat_id: val._id,
          content: val.message,
          create_at: val.create_at,
          update_at: val.update_at,
          userinfo: {
            user_id: val.user_id,
            gg_name: data[0].google_name,
            gg_img: data[0].google_photo,
            gg_id: data[0].google_id,
            fb_name: data[0].facebook_name,
            fb_img: data[0].facebook_photo,
            fb_id: data[0].facebook_id,
          },
        });
      }

      if (ind === chatData.length - 1) {
        res.json({
          status: true,
          data: allData,
          ratings: evaluateData,
          countLike: likeData,
        });
      }
    });
  });
};
