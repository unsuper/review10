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
  let sort = Number(req.params.sort);

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
  ).sort({ "create_at": sort });

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
    });

    User.findOne({ _id: val.user_id }, function (err, data) {
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
          user_id: val.user_id,
          userInfo: data,
        };
      } else {
        allData.push({
          chat_id: val._id,
          content: val.message,
          create_at: val.create_at,
          update_at: val.update_at,
          user_id: val.user_id,
          userInfo: data,
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

exports._getAllByLike = async (req, res) => {
  let allData = [];
  let likeData = [];

  let ratingData = await Evaluate.find(
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

  await Chat.find({ movie_id: req.params.movie_id }, function (err, data) {
    if (err) {
      res.json({
        result: false,
        message: "get all chat fail ! " + err.message,
        items: [],
      });
    } else {
      data.map((val, ind) => {
        Like.countDocuments({ chat_id: val._id }, function (err, count) {
          if (err) {
            res.json({
              status: -1,
              message: err,
            });
          } else {
            likeData.push({
              chat_id: val._id,
              count: count,
            });

            User.findOne({ _id: val.user_id }, function (err, user) {
              if (err) {
                res.json({
                  result: false,
                  message: "get all chat fail ! " + err.message,
                  items: [],
                });
              } else {
                allData.push({
                  chat_id: val._id,
                  content: val.message,
                  create_at: val.create_at,
                  update_at: val.update_at,
                  user_id: user._id,
                  userInfo: user,
                  sumLike: count,
                });
                if (ind === data.length - 1) {
                  let sortArray = allData.sort(
                    compareValues("sumLike", "desc")
                  );
                  res.json({
                    status: true,
                    data: sortArray,
                    ratings: ratingData,
                    countLike: likeData,
                  });
                }
              }
            });
          }
        });
      });
    }
  });

  function compareValues(key, order = "asc") {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order == "desc" ? comparison * -1 : comparison;
    };
  }
};
