
module.exports = function (app) {
    const History = require('../Controllers/History.controller')
   app.route('/v1/history/add')
        .post(History._addHistory) //add post với data request body
    app.route('/v3/history/get/:user_id')
        .get(History._findHistory)
    app.route('/v5/history/delete/:_id')
        .get(History._deleteHistory)

    app.route('/v5/history/delete/all/:invite_id')
        .get(History._deleteHistoryByInvite)
};