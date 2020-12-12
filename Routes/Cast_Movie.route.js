const Video = require('../Models/Video');


module.exports = function (app) {
    const Cast_Movie = require('../Controllers/Cast_Movie.controller')
    app.route('/v1/cast_movie/add')
        .post(Cast_Movie._addCastMovie)
    app.route('/v3/cast_movie/get/id/:_id')
        .get(Cast_Movie._getCastMovie)
    app.route('/v5/cast_movie/delete/:_id')
        .get(Cast_Movie._deleteCastMovie)
    app.route('/v4/cast_movie/update/:_id')
        .post(Cast_Movie._updateCastMovie)
};