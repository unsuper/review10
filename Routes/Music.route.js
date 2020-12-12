
module.exports = function (app) {
    const Music = require('../Controllers/Music.controller')
   app.route('/v1/music/create')
        .post(Music._addMusic) 

    app.route('/v3/music/get/channel/:channel_id')
        .get(Music._getMusicByChannel)

    app.route('/v4/music/update')
        .post(Music._updateMusic)

    app.route('/v5/music/delete/:_id')
        .get(Music._deleteMusic)
   
};