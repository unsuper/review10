module.exports = function (app) {
  const Category = require("../Controllers/Category.controller");
  app
    .route("/v1/category/body/add")
    .get(Category._addCategory) // add với dữ liệu gắn sẵn
    .post(Category._addCategoryPostBody); // add với post body
  app
    .route("/v1/category/params/add/:name/:position/:status")
    .post(Category._addCategoryPostParams); // add vs post parmas

  app
    .route("/v3/category/get/:category_id")
    .get(Category._getCategory_by_category_ID); //get category by id
  app.route("/v3/category/getAll").get(Category._getAllCategory); // get all category
  app.route("/v4/category/update/:_id").post(Category._updateCategory);
  app.route("/v5/category/delete/:_id").get(Category._deleteCategory);
  app.route("/v4/category/enable/:_id").get(Category._enableCategory);

  //views
  app.route("/cate-list").get(Category._showCategoryList);
  app.route("/cate-add").get(Category._showCategoryAdd);
  app.route("/cate-update/:_id").get(Category._showCategoryUpdate);
};
