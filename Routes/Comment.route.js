
module.exports = function (app) {
    const Comment = require('../Controllers/Comment.controller')
   app.route('/v1/comment/create')
        .post(Comment._addComment) 
    app.route('/v4/comment/update')
        .post(Comment._updateComment)
   app.route('/v3/comment/get/:movie_id')
        .get(Comment._findComment)
}; 