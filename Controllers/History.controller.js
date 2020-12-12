const History = require('../Models/History')
const moment = require('moment');
const User = require('../Models/User');
exports._addHistory=async(req,res)=>{
    await History.findOne({'movie_id':req.body.movie_id},function(err,history){
        if (err) {
            res.json({
                result:false,
                message:'check movie history fail',
                position:1
            })
        }else {
            if (history === [] || history === null) {
                let history = new History({
                    create_at:moment().format('YYYY-MM-DD HH:mm'),
                    movie_id:req.body.movie_id,
                    video_id:req.body.video_id,
                    duration:req.body.duration,
                    user_id:req.body.user_id,
                })
                history.save(function (err) {
                    if(err){
                        res.json({
                            result:false,
                            message:'Add history fail '+err.message,
                            position:1
                        })
                    }else{
                        res.json({
                            result:true,
                            message:'add history ok!',
                            position:2
                        })
                    }
                })
            }else{
                History.findOneAndUpdate({'movie_id':req.body.movie_id},{
                    create_at:moment().format('YYYY-MM-DD HH:mm'),
                    video_id:req.body.video_id,
                    duration:req.body.duration,
                    user_id:req.body.user_id,
                },function(error){
                    if (error) {
                        res.json({
                            result:false,
                            position:1,
                            message:'update history fail '+error.message
                        })
                    }else{
                        res.json({
                            result:true,
                            position:2,
                            message:'update history ok !'
                        })
                    }
                })
            }
        }
    })
}

exports._findHistory = async (req,res)=>{
    History.find({user_id:req.params.user_id}).limit(Number.parseInt(req.query.limit)).populate('movie_id').sort({'create_at':-1}).exec(function(err,data){
        if (err) {
            res.json({
                result:false,
                message:'get history movie by user_id fail :'+err.message
            })
        }else{
            res.json({
                result:true,
                message:'get history movie by user_id ok',
                items:data
            })
        }
    })
}

exports._deleteHistory = async (req,res) =>{
    History.remove({_id:req.params._id},function(err){
        if(err){
            res.json({
                result:false,
                message:'delete history fail '+err.message
            })
        }else{
            res.json({
                result:true,
                message:'delete history ok!'
            })
        }
    })
}

exports._deleteHistoryByInvite = async (req,res)=>{
    History.remove({user_id:req.params.invite_id},function(err){
        if (err) {
            res.json({
                result:false,
                message:'remove history movie by invite fail '+err.message
            })
        }else{
            res.json({
                result:true,
                message:'remove history movie by invite ok'
            })
        }
    })
}