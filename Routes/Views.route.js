module.exports = function (app) {
  const Views = require("../Controllers/Views.controller");
  const Movie = require('../Controllers/Movie.controller')

  app.route("/Dashboard").get(Views._ViewFilm);
  //app.route("/movie-add").get(Views._AddFilm);

  app.route("/movie-edit/:_id").get(Movie._showMovieEdit);
  app.route("/movie-add").get(Movie._showMovieAdd);
  app.route("/movie-list").get(Movie._showMovieList);
  app.route("/movie-update").get(Movie._showMovieUpdate);
  app.route("/v7/movie/remove/:_id").get(Movie._removeMovie);
  app.route("/v7/movie/enable/:_id").get(Movie._enableMovie);
};
