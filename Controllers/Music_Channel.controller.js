const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const User = require('../Models/User');
const moment = require('moment');
const Music =require('../Models/Music')
const Channel =require('../Models/Music_Channel');
const { json } = require('body-parser');

exports._addChannel = async(req,res)=>{
    const {kind,title,des,photo_default,photo_high} = req.body
    if (kind && title && des && photo_default && photo_high) {
        let newChannel = new Channel({
            key:{
                kind:kind,
            },
            info : {
                title:title,
                des:des,
                photo:{
                    default:{
                        url:photo_default
                    },
                    high:{
                        url:photo_high
                    }
                },
            },
            date:{
                create_at:moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            amount:{
                number:0,
            }
        })

        newChannel.save(function(err){
            if (err) {
                res.json({
                    result:false,
                    message:'create channel music fail '+err,
                    ping : 999
                })
            }else{
                res.json({
                    result:true,
                    message:'create channel music ok !!!~~~',
                    ping : 03,
                    data:newChannel
                })
            }
        })
    }
}

exports._findChannel = async(req,res)=>{
    await Channel.find({},function(err,snippet){
        if (err) {
            res.json({
                result:false,
                message:'find channel fail '+err
            })
        }else{
            res.json({
                result:true,
                message:'find channel ok !!~~',
                snippet:snippet
            })
        }
    }).limit(Number.parseInt(req.query.limit))
}

exports._updateChannel = async(req,res)=>{
    const {kind,title,des,photo_default,photo_high} = req.body
    await Channel.findOneAndUpdate({_id:req.body._id},{
        key:{
            kind:kind,
        },
        info : {
            title:title,
            des:des,
            photo:{
                default:{
                    url:photo_default
                },
                high:{
                    url:photo_high
                }
            },
        },
        date:{
            create_at:req.body.create_at,
            update_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        },
    },function(err,doc,data){
        if (err) {
            res.json({
                result:false,
                message:'update channel fail '+err
            })
        }else{
            res.json({
                result:true,
                message:'update channel ok !!~~',
                doc:doc,
                snippet:data
            })
        }
    })
}

exports._deleteChannel = async (req,res)=>{
    await Channel.findOneAndUpdate({_id:req.params._id},{
        'date.delete_at':moment().format('YYYY-MM-DD HH:mm:ss')
    },function(err,doc,data){
        if (err) {
            res.json({
                result:false,
                message:'delete channel fail '+err
            })
        }else{
            res,json({
                result:true,
                message:'delete channel ok !!~~',
                doc:doc,
                snippet:data
            })
        }
    })
}