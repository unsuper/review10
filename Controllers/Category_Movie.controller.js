const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const moment = require('moment');

// add category_movie
exports._addCategory_Movie = (req,res)=>{
    let new_cate_movie = new Category_Movie({
        status:'ok',
        create_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at:null,
        category_id:'5f63280be02d2a2de853e2bc',
        movie_id:'5f632fd17e226c39ccc1e756'
    })

    new_cate_movie.save(function(err,data){
        if(err){
            res.json({
                result:false,
                message:error.message,
                status:'Error add Category_movie'
            });
        }else{
            res.json({
                result:true,
                message:'Add category_movie ok!',
                items:data
            });
        }
    })
}

// add category_movie by post body
exports._addCategory_Movie_Post_body=(req,res)=>{
    let new_cate_movie = new Category_Movie({
        status:req.body.status,
        create_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at:null,
        category_id:req.body.category_id,
        movie_id:req.body.movie_id
    })
    new_cate_movie.save(err=>{
        if(err){
            res.json({
                result:false,
                message:err.message,
                status:'Error add Category_movie'
            });
        }else{
            res.json({
                result:true,
                message:'Add category_movie ok!',
                items:new_cate_movie
            });
        }
    })
}

// add category_movie by post params
exports._addCategory_Movie_Post_params=(req,res)=>{
    let new_cate_movie = new Category_Movie({
        status:req.params.status,
        create_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at:null,
        category_id:req.params.category_id,
        movie_id:req.params.movie_id
    })
    new_cate_movie.save(err=>{
        if(err){
            res.json({
                result:false,
                message:error.message,
                status:'Error add Category_movie'
            });
        }else{
            Movie.findByIdAndUpdate({_id:req.params.movie_id},{
                update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            },function(err1){
                if(err1){
                    res.json({
                        result:false,
                        message:err1.message,
                        status:'Error edit Movie Update at'
                    });
                }else{
                    res.json({
                        result:true,
                        message:'Add category_movie ok!',
                        items:new_cate_movie
                    });
                    console.log(req.params.movie_id);
                }
            })
        }
    })
}
