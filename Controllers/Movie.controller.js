const Category = require("../Models/Category");
const Category_Movie = require("../Models/Category_Movie");
const Video = require("../Models/Video");
const Movie = require("../Models/Movie");
const Cast = require("../Models/Cast");
const Cast_Movie = require("../Models/Cast_Movie");
const moment = require("moment");
const Admin = require("../Contants/firebase_config");
const { response } = require("express");
const { topPic } = require("../Contants/contants");

// add movie by body
exports._showMovieAdd = async (req, res) => {
  await Category.find({ delete_at: null }, function (err, cate) {
    if (err) {
      res.render("movie-add", { data: [] });
    } else {
      res.render("movie-add", { data: cate });
    }
  });
};

exports._showMovieEdit = async (req, res) => {
  const categories = await Category.find({}, function (err, cate) {
    if (err) {
      return [];
    } else {
      return cate;
    }
  });
  const movie = await Movie.find(
    { _id: req.params._id },
    function (err, movie) {
      if (err) {
        return [];
      } else {
        return movie;
      }
    }
  );

  const video = await Video.find(
    { movie_id: req.params._id },
    function (err, video) {
      if (err) {
        return [err];
      } else {
        return video;
      }
    }
  );

  if (categories && movie && video)
    res.render("movie-edit", {
      movie: movie,
      categories: categories,
      video: video,
    });
};

exports._showMovieList = async (req, res) => {
  await Movie.find({}, function (err, data) {
    if (err) {
      res.render("movie-list", { data: [] });
    } else {
      res.render("movie-list", { data: data });
    }
  });
};

exports._showMovieUpdate = async (req, res) => {
  res.render("movie-update");
};

//remove
exports._removeMovie = async (req, res) => {
  let _id = req.params._id;
  Movie.findByIdAndRemove(_id, (err, doc) => {
    if (err) {
      res.json({
        err: err,
        result: false,
      });
    } else {
      res.redirect("/movie-list");
    }
  });
};

// delete
exports._enableMovie = async (req, res) => {
  await Movie.updateOne(
    { _id: req.params._id },
    {
      delete_at: null,
    },
    function (err) {
      if (err) {
        res.json({
          result: false,
          message: "enable movie fail : " + err.message,
        });
      } else {
        // res.json({
        //     result: true,
        //     message: 'enable movie ok ',
        // });
        res.redirect("/movie-list");
      }
    }
  );
};

//=================================

// add movie by body
exports._addMoviePostBody = async (req, res) => {
  var {
    name,
    director,
    country,
    language,
    years,
    duration,
    description,
    cover_img,
    trailer,
  } = req.body;
  let movie_new = new Movie({
    name: name,
    directer: director,
    status: 1,
    create_at: moment(new Date()).format("YYYY-MM-DD HH:mm"),
    update_at: null,
    delete_at: null,
    country: country,
    language: language,
    years: years,
    duration: duration,
    introduction: description,
    cover_img: cover_img,
    trailer: trailer,
  });

  await movie_new.save((error) => {
    if (error) {
      res.json({
        result: false,
        message: error.message,
        status: "Error add Movie",
      });
    } else {
      let cate_movie_new = new Category_Movie({
        status: "oke",
        create_at: null,
        update_at: null,
        delete_at: null,
        category_id: req.body.category_id,
        movie_id: movie_new._id,
      });

      cate_movie_new.save((err) => {
        if (err) {
          res.json({ message: err });
        } else {
          let video = new Video({
            create_at: new Date(),
            update_at: null,
            delete_at: null,
            link: req.body.video_id,
            title: "Tập 1",
            position: 1,
            type_source: "youtube",
            movie_id: movie_new._id,
          });
          video.save((err) => {
            if (err) {
              res.json({ message: "Video not oke" });
            } else {
              res.json({ message: "Video Oke" });
            }
          });
        }
      });
    }
  });
};

//get movie by score
exports._getMovieByScore = async (req, res) => {
  await Movie.find({ years: moment().year().toString() }, function (err, data) {
    if (err) {
      res.json({
        result: false,
        message: "get movie by score hight fail" + err.message,
      });
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.json({
        result: true,
        message: "get movie by score hight ok",
        items: data,
      });
    }
  })
    .limit(Number.parseInt(req.query.limit))
    .sort({ score: -1 });
};

// get Movie by id
exports._getMovieByID = (req, res) => {
  new Promise((resolve, reject) => {
    Movie.findById({ _id: req.params._id }, function (err, data) {
      if (err) {
        res.json({
          result: false,
          message: err.message,
          items: [],
        });
        reject(err);
      } else {
        res.json({
          result: true,
          message: "result ok",
          items: data,
        });
        resolve(data);
      }
    });
  });
};

// get detail film by movie_id
exports._getMovie_detail_byID = async (req, res) => {
  await Category_Movie.find({ movie_id: req.params.movie_id })
    .populate("category_id")
    .exec(function (err, data) {
      console.log(data);
      if (err) {
        res.json({
          result: false,
          message: "get Category fail ! " + err.message,
          items: [],
        });
      } else {
        Cast_Movie.find({ movie_id: req.params.movie_id })
          .populate("cast_id")
          .exec(function (err1, cast) {
            if (err1) {
              res.json({
                result: false,
                message: "get cast fail ! " + err.message,
                items: [],
              });
            } else {
              Movie.find({ _id: req.params.movie_id }, function (error, movie) {
                if (error) {
                  res.json({
                    result: false,
                    message: "get movie fail " + error.message,
                    items: [],
                  });
                } else {
                  res.json({
                    result: true,
                    message: "result ok",
                    category: data.map((element, index) => {
                      return {
                        index: index,
                        name: element.category_id.name,
                        category_id: element.category_id._id,
                      };
                    }),
                    movie: movie,
                    cast: cast.map((e, idx) => {
                      return {
                        index: idx,
                        name: e.cast_id.name,
                        cover_img: e.cast_id.cover_image,
                        _id: e.cast_id._id,
                      };
                    }),
                  });
                }
              });
            }
          });
      }
    });
};

// get movie by category_id
exports._getMovie_by_categoryID = async (req, res) => {
  await Category_Movie.find({ category_id: req.params.category_id })
    .populate("movie_id")
    .limit(Number.parseInt(req.query.limit))
    .exec(function (err, data) {
      if (err) {
        res.json({
          result: false,
          message: "get movie by category_id fail ! " + err.message,
          items: [],
        });
      } else {
        res.json({
          result: true,
          message: "get Category_id ok ! ",
          items: data,
        });
      }
    });
};

// get all movie

exports._getAllMovie = async (req, res) => {
  await Movie.find({}, function (err, data) {
    if (err) {
      res.json({
        result: false,
        message: "get all movie fail ! " + err.message,
        items: [],
      });
    } else {
      res.json({
        result: true,
        message: "get all movie ok!",
        items: data,
      });
    }
  }).limit(Number.parseInt(req.query.limit));
};
// update
exports._updateMovie = async (req, res) => {
  await Movie.updateOne(
    { _id: req.body._id },
    {
      name: req.body.name,
      directer: req.body.directer,
      status: 1,
      update_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      screenwriter: req.body.screenwriter,
      country: req.body.country,
      language: req.body.language,
      years: req.body.years,
      duration: req.body.duration,
      episode: req.body.episode,
      score: req.body.score,
      introduction: req.body.introduction,
      cover_img: req.body.cover_img,
    },
    function (err) {
      if (err) {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          result: false,
          message: "update movie fail : " + err.message,
        });
      }
    }
  );

  await Video.updateOne(
    { movie_id: req.body._id },
    {
      link: req.body.link,
      title: req.body.title,
      type_source: req.body.type_source,
    },
    function (err) {
      if (err) {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          result: false,
          message: "update movie fail : " + err.message,
        });
      }
    }
  );

  await Category_Movie.updateOne(
    { movie_id: req.body._id },
    { category_id: req.body.category_id },
    function (err) {
      if (err) {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          result: false,
          message: "update movie fail : " + err.message,
        });
      } else {
        res.json({
          result: true,
          message: "update movie ok ",
        });
      }
    }
  );
};

// get movie by new Create_at
exports._getMovieByCreate_at = async (req, res) => {
  await Movie.find({}, function (err, data) {
    if (err) {
      res.header("Access-Control-Allow-Origin", "*");
      res.json({
        result: false,
        message: "get movie sort create_at fail : " + err.message,
      });
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json({
        result: true,
        message: "get movie sort create ok!",
        items: data,
      });
    }
  })
    .sort({ create_at: -1 })
    .limit(Number.parseInt(req.query.limit));
};

// delete
exports._deleteMovie = async (req, res) => {
  await Movie.updateOne(
    { _id: req.params._id },
    {
      delete_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    function (err) {
      if (err) {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          result: false,
          message: "delete movie fail : " + err.message,
        });
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          result: true,
          message: "delete movie ok ",
        });
      }
    }
  );
};

// api set score movie
exports._setScore = async (req, res) => {
  await Movie.find({ _id: req.params._id }, function (err, data) {
    if (err) {
      res.header("Access-Control-Allow-Origin", "*");
      res.json({
        result: false,
        message: "get movie set score fail : " + err.message,
      });
    } else {
      console.log(data);
      Movie.updateOne(
        { _id: req.params._id },
        {
          score: data[0].score + 1,
        },
        function (err1) {
          if (err1) {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
              result: false,
              message: "set score movie fail : " + err1.message,
            });
          } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
              result: true,
              message: "set score movie ok ",
            });
          }
        }
      );
    }
  });
};

exports._search = async (req, res) => {
  var regex = new RegExp([`.*${req.params.text}.*`].join(""), "i");

  await Cast.find({ name: regex })
    .limit(Number.parseInt(req.query.limit))
    .exec(function (e, cast) {
      if (e) {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          result: false,
          message: "search movie faill " + e.message,
        });
      } else {
        Movie.find({ name: regex })
          .limit(Number.parseInt(req.query.limit))
          .exec(function (err, data) {
            if (err) {
              res.header("Access-Control-Allow-Origin", "*");
              res.json({
                result: false,
                message: "search movie faill " + err.message,
              });
            } else {
              res.header("Access-Control-Allow-Origin", "*");
              res.json({
                result: true,
                message: "ok co data",
                movie: data,
                cast: cast,
              });
            }
          });
      }
    });
};
