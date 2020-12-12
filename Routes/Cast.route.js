

module.exports = function (app) {
    const Cast = require('../Controllers/Cast.controller')
    app.route('/v1/cast/add')
        .post(Cast._addCast)
    app.route('/v3/cast/get/:id')
        .get(Cast._getCast_by_id)
    app.route('/v3/cast/getAll')
        .get(Cast._getAllCast)
    app.route('/v2/cast/increaseView/:_id')
        .get(Cast._increaseView)
    app.route('/v4/cast/update/:_id')
        .post(Cast._updateCast)
    app.route('/v5/cast/delete/:_id')
        .get(Cast._deleteCast)
};