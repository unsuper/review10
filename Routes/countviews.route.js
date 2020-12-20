module.exports = function (app) {
    const views = require("../Controllers/sumviews.controller");
    app.route("/v1/countview/:movie_id").get(views.countViewsByMovieId);
    app.route("/v1/getViews/:movie_id").get(views.getViewsByMovieId);
  };
  