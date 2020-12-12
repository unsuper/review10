
module.exports = function (app) {
    const Follow = require('../Controllers/Follows.controller')
   app.route('/v1/follow/create/:type')
        .post(Follow._addFollow)
    app.route('/v5/follow/delete/:type/:user_id/:_id')
        .get(Follow._deleteFollow)
    app.route('/v5/follow/delete/user/:user_id')
        .get(Follow._deleteAllFollow)
    app.route('/v3/follow/get/:type/:user_id')
        .get(Follow._findFollowUser)
};