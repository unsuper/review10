const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const User = require('../Models/User');
const moment = require('moment');
const Music =require('../Models/Music')
const Channel =require('../Models/Music_Channel');
const { findOneAndUpdate } = require('../Models/Category');

exports._addMusic = async(req,res)=>{
    const {title,link,channel,description,photo_default,photo_high} = req.body
    if (title && link &&  channel&&photo_default&&photo_high) {
        let newMusic = new Music({
            info:{
                title:title,
                link : link,
                channel:channel,
                description:description,
                thumbnails:{
                    default:{
                        url:photo_default
                     },
                     high:{
                         url:photo_high
                     }
                }
            },
            moment:{
                create_at:moment().format('YYYY-MM-DD HH:mm:ss'),
                update_at:null,
                delete_at:null
            },
            interactive:{
                view:0,
                evaluate:0,
            }
        })
        newMusic.save(function(err){
            if (err) {
                res.json({
                    result:false,
                    message:'create music fail '+err,
                    ping:999
                })
            }else{
                res.json({
                    result:true,
                    message:'create music ok !!!!~~~~~',
                    ping:01,
                    data:newMusic
                })
            }
        })
    }
}

exports._getMusicByChannel =async (req,res)=>{
    await Music.find({'info.channel':req.params.channel_id},function(err,snippet){
        if (err) {
            res.json({
                result:false,
                message:'find music by channel fail '+err
            })
        }else{
            res.json({
                result:true,
                message:'find music by channel ok ',
                snippet:snippet
            })
        }
    }).limit(Number.parseInt(req.query.limit))
}

exports._updateMusic = async(req,res)=>{
    const {title,link,channel,description,photo_default,photo_high,create_at} = req.body
    await Music.findOneAndUpdate({_id:req.body._id},{
        info:{
            title:title,
            link : link,
            channel:channel,
            description:description,
            thumbnails:{
                default:{
                    url:photo_default
                 },
                 high:{
                     url:photo_high
                 }
            }
        },
        moment:{
            create_at:moment(create_at,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            update_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        },
     
    },function(err,doc,snipper){
        if (err) {
            res.json({
                result:false,
                message:'update music fail '+err
            })
        }else{
            res.json({
                result:true,
                message:'update music ok ',
                snippet:snipper,
                doc:doc
            })
        }
    })
}


exports._deleteMusic = async (req,res)=>{
    await Music.findOneAndUpdate({_id:req.params._id},{
        'moment.delete_at':moment().format('YYYY-MM-DD HH:mm:ss')
    },function(err){
        if (err) {
            res.json({
                result:false,
                message:'delete music fail '+err
            })
        }else{
            res.json({
                result:true,
                message:'delete music ok !!~~'
            })
        }
    })
}
