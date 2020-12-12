module.exports = function (app) {
  const Evaluate = require("../Controllers/Evaluate.controller");
  app.route("/v1/evaluate/create").post(Evaluate._addEvaluate);
  app.route("/v3/evaluate/get/:movie_id").get(Evaluate._findEvaluate);
  app
    .route("/v3/evaluate/average/value/:movie_id")
    .get(Evaluate._getValueAverageMovie);
  app
    .route("/v3/eval/getToShow/:user_id/:movie_id")
    .get(Evaluate._findEvaluateByUserIdAndMovieId);
};
