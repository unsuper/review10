module.exports = function (app) {
    const Category_Movie = require('../Controllers/Category_Movie.controller');
    app.route('/v1/category_movie/body/add')
        .post(Category_Movie._addCategory_Movie_Post_body)// add vs post body
    app.route('/v1/category_movie/params/add/:status/:category_id/:movie_id')
        .post(Category_Movie._addCategory_Movie_Post_params)
         // add vs post params
 };