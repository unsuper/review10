
module.exports = function (app) {
    const Channel = require('../Controllers/Music_Channel.controller')
   app.route('/v1/channel-music/create')
        .post(Channel._addChannel) 
    app.route('/v3/channel-music/getAll')
        .get(Channel._findChannel)
   
    app.route('/v4/channel-music/update')
        .post(Channel._updateChannel)
    app.route('/v5/channel-music/delete/:_id')
        .get(Channel._deleteChannel)
}; 