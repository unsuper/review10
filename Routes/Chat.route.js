module.exports = function (app) {
    const Chat = require("../Controllers/Chat.controller");
    app.route('/v1/chat/create').post(Chat._addChat)
    app.route('/v3/chat/getAll/:movie_id/:sort').get(Chat._getAll)
    app.route('/v3/chat/getByLike/:movie_id').get(Chat._getAllByLike)
  };
  