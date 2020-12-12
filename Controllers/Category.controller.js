const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const moment = require('moment');
exports._addCategory=(req,res)=>{
    let cate = new Category({
        category_id:Math.random().toString(16).replace(/[^a-z]+[^0-9]/, '').substr(0, 9),
        name:'Viễn Tưởng',
        position:1,
        status:'Một thể loại phim sử dụng những mô tả mang tính tiên đoán và hư cấu dựa trên khoa học về các hiện tượng mà khoa học chính thống không chấp nhận đầy đủ như sinh vật ngoài Trái Đất, thế giới người ngoài hành tinh, ngoại cảm và du hành thời gian cùng với các yếu tố tương lai như tàu vũ trụ, robot, sinh vật cơ khí hóa, du hành liên sao hoặc các kỹ thuật khácng bao gồm sự đối đầu giữa "cái thiện" và "cái ác" với nhiều cuộc chiến ác liệt bằng tay không hoặc vũ khí, tiết tấu nhanh và kĩ xảo điện ảnh cao.',
        create_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at:null,
    })
    cate.save(err=>{
        if(err){
            res.json({
                result:false,
                message:err.message,
               });
        }else{
            res.json({
                result:true,
                message:'OK',
               });
        }
    })
}
// add params
exports._addCategoryPostParams=(res,req)=>{
    let cate = new Category({
        name:req.params.name,
        position:req.params.position,
        status:req.params.status,
        create_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at:null,
    })

    cate.save(err=>{
        if(err){
            res.json({
                result:false,
                message:err.message,
               });
        }else{
            res.json({
                result:true,
                message:'OK',
               });
        }
    })

}

//add body
exports._addCategoryPostBody=(req,res)=>{
    let cate = new Category({
        name:req.body.name,
        position:req.body.position,
        status:req.body.status,
        create_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at:null
    })
    cate.save(err=>{
        if(err){
            res.json({
                result:false,
                message:err.message,
               });
        }else{
            res.json({
                result:true,
                message:'OK',
                items:cate
               });
        }
    })
}

// get category by category_id
exports._getCategory_by_category_ID= (req,res) =>{
    new Promise((resolve,reject)=>{
        Category.find({_id:req.params.category_id},function(err,cate){
            if(err){
                res.json({
                    result:false,
                    message:err.message,
                    items:null,
                });
                reject(err)
            }else{
                res.json({
                    result:true,
                    message:'Request data OK',
                    items: cate
                })
                resolve(cate)
            }
        })   
    })   
}

// get all category
exports._getAllCategory = async (req,res) =>{
   await Category.find({delete_at: null},function(err,cate){
        if(err){
            res.json({
                result:false,
                message:err.message,
                items:cate,
            });
        }else{
            res.json({
                result:true,
                message:'Request data OK',
                items: cate
            })
        }
    })
}

exports._updateCategory = async (req,res) =>{
    await Category.updateOne({_id:req.params._id},{
        name:req.body.name,
        position:req.body.position,
        status:req.body.status,
        update_at:moment().format('YYYY-MM-DD HH:mm:ss')
    },function(err){
        if (err) {
            res.json({
                result: false,
                message: err.message,
                status: 'Error update category'
            });
        }else{
            res.json({
                result: true,
                status: 'update category ok!'
            });
        }
    })
}

exports._deleteCategory = async(req,res) =>{
    await Category.updateOne({_id:req.params._id},{
        delete_at:moment().format('YYYY-MM-DD HH:mm:ss')
    },function(err){
        if (err) {
            res.json({
                result: false,
                message: err.message,
                status: 'Error delete category'
            });
        }else{
            res.json({
                result: true,
                status: ' delete category ok!'
            });
        }
    })
}

exports._showCategoryList = (req, res) => {

    Category.find({}, function (err, cate) {
        if (err) {
            res.render("category-list", { data: [] })

        } else {
            res.render("category-list", { data: cate })

        }
    })
}

exports._showCategoryAdd = (req, res) => {

    res.render("category-add")
}

exports._showCategoryUpdate = (req, res) => {
    //console.log(req.params);
    //res.render("category-update",{})
    let _id = req.params._id
    Category.find({ _id: _id }, function (err, cate) {
        if (err) {
            res.send(err)
        } else {
            res.render("category-update", { data: cate })

        }
    })
}

exports._enableCategory = async (req, res) => {
    await Category.updateOne({ _id: req.params._id }, {
        delete_at: null
    }, function (err) {
        if (err) {
            res.json({
                result: false,
                message: err.message,
                status: 'Error enable category'
            });
        } else {
            res.redirect("/cate-list")
        }
    })
}