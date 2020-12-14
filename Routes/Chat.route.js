module.exports = function (app) {
    const Chat = require("../Controllers/Chat.controller");
    app.route('/v1/chat/create').post(Chat._addChat)
    app.route('/v3/chat/getAll/:movie_id').get(Chat._getAll)
  };
  