module.exports = function (app) {
  const Video = require("../Controllers/Video.controller");
  app.route("/v1/video/add").post(Video._addVideo);
  app.route("/v4/video/update/:_id").post(Video._updateVideo);
  app.route("/v3/video/get/id/:_id").get(Video._getVideo);
  app.route("/v3/video/get/all/movie/id/:_id").get(Video._getAllVideoByMovie);
  app.route("/v5/video/delete/id/:_id").get(Video._deleteVideo);
  app.route("/video-movie-add").get(Video._showVideoMovieAdd);
  app.route("/v4/video/show/:_id").get(Video._showHiddenVideo);
  app.route("/v5/video/removeForever/:_id").get(Video._deleteForeverVideo);
};
