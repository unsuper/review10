const Category = require("../Models/Category");
const Category_Movie = require("../Models/Category_Movie");
const Video = require("../Models/Video");
const Movie = require("../Models/Movie");
const moment = require("moment");
const Admin = require("../Contants/firebase_config");
const { response } = require("express");
const { topPic } = require("../Contants/contants");

exports._showVideoMovieAdd = async (req, res) => {
  await Video.find({ movie_id: req.query._id }, function (err, data) {
    if (err) {
      res.render("video-movie-add", { _id: req.query._id, data: [] });
    } else {
      res.render("video-movie-add", { _id: req.query._id, data: data });
    }
  }).sort({ position: 1 });
};

exports._addVideo = async (req, res) => {
  await Video.findOne(
    { movie_id: req.body.movie_id, position: req.body.position },
    function (e1, video) {
      console.log(video);
      if (e1) {
        res.json({
          result: false,
          ping: 999,
          message: "create video by movie fail",
        });
      } else {
        if (video) {
          res.json({
            result: false,
            ping: 499,
            message:
              "Movie này đã có tập " +
              req.body.position +
              ", bạn không thể thêm 1 tập " +
              req.body.position +
              " khi đang tồn tại !",
            video: video,
          });
        } else {
          let newVideo = new Video({
            create_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            update_at: null,
            delete_at: null,
            movie_id: req.body.movie_id,
            title: "Tập " + req.body.position,
            position: req.body.position,
            link: req.body.link,
            type_source: req.body.type_source,
          });

          newVideo.save(function (err) {
            if (err) {
              res.json({
                result: false,
                message: "add video movie fail" + err.message,
              });
            } else {
              Movie.findOneAndUpdate(
                { _id: req.body.movie_id },
                {
                  status: req.body.position,
                },
                function (e3, doc, movieData) {
                  if (e3) {
                    res.json({
                      result: false,
                      message: "add video movie fail" + err.message,
                      note: "update status movie fail" + e3,
                    });
                  } else {
                    console.log(doc.cover_img);
                    if (doc) {
                      const message_option = {
                        topic: req.body.movie_id,
                        notification: {
                          title: doc.name + " tập " + req.body.position,
                          body:
                            "Cập nhật lúc " + moment().format("HH:mm") + " !",
                          imageUrl: doc.cover_img,
                        },
                        data: {
                          position: req.body.position,
                          movie_id: req.body.movie_id,
                          type: "video",
                          video_id: newVideo._id.toString(),
                          movie_id: req.body.movie_id,
                        },
                      };
                      Admin.admin
                        .messaging()
                        .send(message_option)
                        .then((response) => {
                          // res.json({
                          //   result: true,
                          //   message: "add video movie ok",
                          //   items: newVideo,
                          //   send: "ok" + response,
                          //   dataSend: message_option,
                          // });

                          res.redirect("/video-movie-add");
                        })
                        .catch((e) => {
                          res.json({
                            result: true,
                            message: "add video movie ok",
                            items: newVideo,
                            send: "fail " + e.message,
                          });
                        });
                    } else {
                      res.json({
                        result: true,
                        message: "add video fail",
                        send: "fail ",
                      });
                    }
                  }
                }
              );
            }
          });
        }
      }
    }
  );
};

exports._updateVideo = async (req, res) => {
  await Video.updateOne(
    { _id: req.params._id },
    {
      title: req.body.title,
      update_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      status: req.body.status,
      position: req.body.position,
      link: req.body.link,
      type_source: req.body.type_source,
    },
    function (err) {
      if (err) {
        res.json({
          result: false,
          message: "update video movie fail" + err.message,
        });
      } else {
        res.json({
          result: true,
          message: "update video movie ok",
        });
      }
    }
  );
};

exports._getVideo = async (req, res) => {
  await Video.findOne({ _id: req.params._id }, function (err, video) {
    if (err) {
      res.json({
        result: false,
        message: "get video movie fail" + err.message,
      });
    } else {
      res.json({
        result: true,
        message: "get video movie ok",
        items: video,
      });
    }
  })
    .limit(Number.parseInt(req.query.limit))
    .sort({ position: 1 });
};

exports._getAllVideoByMovie = async (req, res) => {
  await Video.find({ movie_id: req.params._id }, function (err, data) {
    if (err) {
      res.json({
        result: false,
        message: "get video movie fail" + err.message,
      });
    } else {
      res.json({
        result: true,
        message: "get video movie ok",
        items: data,
      });
    }
  }).limit(Number.parseInt(req.query.limit));
};
exports._deleteForeverVideo = async (req, res) => {
  let _id = req.params._id;
  Video.findByIdAndRemove(_id, (err, doc) => {
    if (err) {
      res.json({
        err: err,
        result: false,
      });
    } else {
      res.redirect("/cate-list");
    }
  });
};

exports._deleteVideo = async (req, res) => {
  await Video.updateOne(
    { _id: req.params._id },
    {
      delete_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    function (err) {
      if (err) {
        res.json({
          result: false,
          message: "delete video fail " + err.message,
        });
      } else {
        res.json({
          result: true,
          message: " Hide video ok ",
        });
      }
    }
  );
};

exports._showHiddenVideo = async (req, res) => {
  await Video.updateOne(
    { _id: req.params._id },
    {
      delete_at: null,
    },
    function (err) {
      if (err) {
        res.json({
          result: false,
          message: "Show video fail " + err.message,
        });
      } else {
        res.json({
          result: true,
          message: "Show video ok ",
        });
      }
    }
  );
};
