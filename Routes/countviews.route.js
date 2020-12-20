module.exports = function (app) {
    const sumviews = require("../Controllers/sumviews.controller");
    app.route("/v1/countview/:movie_id").get(sumviews.countViewsByMovieId);
    app.route("/v1/getViews/:movie_id").get(sumviews.getViewsByMovieId);
  };
  