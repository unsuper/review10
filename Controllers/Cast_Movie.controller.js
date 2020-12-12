const Cast_Movie = require('../Models/Cast_Movie')
const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const moment = require('moment');

exports._addCastMovie = async(req,res)=>{
   let newCastMovie = new Cast_Movie({
       status:req.body.status,
       create_at:moment().format('YYYY-MM-DD HH:mm:ss'),
       update_at:null,
       delete_at:null,
       cast_id:req.body.cast_id,
       movie_id:req.body.movie_id
   }) 
   newCastMovie.save(function(err,castMovie){
       if(err){
           res.json({
               result:false,
               message:'add cast movie fail , '+err.message
           })
       }else{
        res.json({
            result:true,
            message:'add cast movie ok ',
            items:newCastMovie
        })
       }
   })
}

exports._getCastMovie = async (req,res)=>{
   await Cast_Movie.findOne({_id:req.params._id},function(err,castMovie){
        if (err) {
            res.json({
                result:false,
                message:'get cast movie fail '+err.message,
                
            })
        }else{
            res.json({
                result:true,
                message:'get cast movie ok ',
                items:castMovie
            })
        }
    })
}

exports._deleteCastMovie = async(req,res)=>{
    await Cast_Movie.updateOne({_id:req.params._id},{
        delete_at:moment().format('YYYY-MM-DD HH:mm:ss')
    },function(err){
        if (err) {
            res.json({
                result:false,
                message:'delete cast movie fail '+err.message,
                
            })
        }else{
            res.json({
                result:true,
                message:'delete cast movie ok ',
                
            })
        }
    })
}

exports._updateCastMovie = async(req,res)=>{
    await Cast_Movie.updateOne({_id:req.params._id},{
        movie_id:req.body.movie_id,
        cast_id:req.body.cast_id
    },function(err){
        if (err) {
            res.json({
                result:false,
                message:'update cast movie fail '+err.message,
                
            })
        }else{
            res.json({
                result:true,
                message:'update cast movie ok ',
                
            })
        }
    })
}