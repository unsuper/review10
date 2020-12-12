const User = require('../Models/User')
const Movie = require('../Models/Movie')
const Comment = require('../Models/Comment')
const Evaluate = require('../Models/Evaluate')
const moment = require('moment')
const { populate } = require('../Models/Comment')


exports._addEvaluate = async(req,res)=>{
    await Evaluate.findOne({'user_id':req.body.user_id,'movie_id':req.body.movie_id},function(err,data){
        if (err) {
            res.json({
                result:false,
                position:1,
                message:'check data evaluate fail '+err.message
            })
        }else{
            if (data === [] || data === null) {
                let evaluate = new Evaluate({
                    user_id:req.body.user_id,
                    movie_id:req.body.movie_id,
                    score:req.body.score,
                    create_at:moment().format('YYYY-MM-DD HH:mm'),
                    update_at:moment().format('YYYY-MM-DD HH:mm')
                })
                evaluate.save(function(e){
                    if (e) {
                        res.json({
                            result:false,
                            position:1,
                            message:'create evaluate fail '+ e.message
                        })
                    }else{
                        res.json({
                            result:true,
                            position:2,
                            message:'create evaluate ok !' + evaluate.create_at
                        })
                    }
                })
            }else{
                Evaluate.findOneAndUpdate({'user_id':req.body.user_id,'movie_id':req.body.movie_id},{
                    score:req.body.score,
                    update_at:moment().format('YYYY-MM-DD HH:mm')
                },function(e1){
                    if (e1) {
                        res.json({
                            result:false,
                            position:1,
                            message:'update evaluate fail '+e1.message,
                        })
                    }else{
                        res.json({
                            result:true,
                            position:2,
                            message:'update evaluate ok '+moment().format('YYYY-MM-DD HH:mm')
                        })
                    }
                })
            }
        }
    })
}

exports._findEvaluateByUserIdAndMovieId = async (req,res) =>{
    await Evaluate.findOne({'user_id':req.params.user_id,'movie_id':req.params.movie_id}, (function (err,data) {
        if (err) {
            res.json({
                result:false,
                position:1,
                message:'get Evaluate fail '+err.message
            })
        }else{
            res.json({
                result:true,
                position:2,
                message:'get evaluate ok '+moment().format('YYYY-MM-DD HH:mm'),
                items:data
            })
        }
    }))
}

exports._findEvaluate = async (req,res) =>{
    await Evaluate.findOne({'movie_id':req.params.movie_id}).limit(Number.parseInt(req.query.limit)).populate('user_id').exec(function (err,data) {
        if (err) {
            res.json({
                result:false,
                position:1,
                message:'get Evaluate fail '+err.message
            })
        }else{
            res.json({
                result:true,
                position:2,
                message:'get evaluate ok '+moment().format('YYYY-MM-DD HH:mm'),
                items:data
            })
        }
    })
}

exports._getValueAverageMovie=async (req,res)=>{
    await Evaluate.find({'movie_id':req.params.movie_id},function(err,data){
        if (err) {
            res.json({
                result:false,
                message:'get average evaluate  fail : '+err.message,
                position: -999
            })
        }else{
            let number = 0
            data.map((e,i)=>{
                number += data[i].score
            })
            res.json({
                result:true,
                number:number/data.length
            })
        }
    })
}

