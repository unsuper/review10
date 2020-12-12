const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const Cast = require('../Models/Cast')
const moment = require('moment');
const Admin = require('../Contants/firebase_config');
const { response } = require('express');
const { topPic } = require('../Contants/contants')

exports._addCast = async (req, res) => {
    console.log('img',req.body.cover_image);
    let new_cast = new Cast({
        name: req.body.name,
        cover_image: req.body.cover_image,
        birthday: moment(req.body.birthday, 'YYYY-MM-DD'),
        nation: req.body.nation,
        create_at: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at: null,
        delete_at: null,
        view: 0,
        story: req.body.story
    })

    await new_cast.save(function (err) {
        if (err) {
            res.json({
                result: false,
                message: err.message,
                status: 'Error add Cast'
            });
        } else {

            const message_option = {
                topic: topPic,
                notification: {
                    title: req.body.name,
                    body: 'Sinh năm '+moment(new_cast.birthday).format('YYYY-MM-DD')+ ', là người quốc tich '+new_cast.nation,
                    imageUrl: req.body.cover_image.toString(),
                  },
                data:{
                    cast_id: new_cast._id.toString(),
                    story:req.body.story,
                    type:'cast'
                }
             
            }

            // console.log('1001',message_option);
            Admin.admin.messaging().send(message_option).then(response => {
                res.json({
                    result: true,
                    status: 'add Cast ok',
                    items: new_cast,
                    send: 'ok' + response,
                    message: message_option
                })
            }).catch(e => {
                res.json({
                    result: true,
                    status: 'add Cast ok',
                    items: new_cast,
                    send: 'fail' + e.message
                })
            })
        }
    })
}

exports._getCast_by_id = async (req, res) => {
    Cast.find({ _id: req.params.id }, function (err, cast) {
        if (err) {
            res.json({
                result: false,
                message: err.message,
                cast: []
            })
        } else {
            res.json({
                result: true,
                message: 'ok!',
                cast: cast
            })
        }
    })
}

exports._getAllCast = async (req, res) => {
    await Cast.find({}, function (err, cast) {
        if (err) {
            res.json({
                result: false,
                message: err.message,
                cast: []
            })
        } else {
            res.json({
                result: true,
                message: 'get all cast connect ok!',
                cast: cast
            })
        }
    })
}

exports._increaseView = async (req, res) => {
    await Cast.findOne({ _id: req.params._id }, function (err, cast) {
        if (err) {
            res.json({
                result: false,
                message: err.message,
                title: 'find cast by id fail'
            })
        } else {
            Cast.findOneAndUpdate({ _id: cast._id }, {
                view: cast.view + 1
            }, function (err1) {
                if (err1) {
                    res.json({
                        result: false,
                        message: err.message,
                        title: 'update cast add view fail'
                    })
                } else {
                    res.json({
                        result: true,
                        title: 'update cast add view ok'
                    })
                }
            })
        }
    })
}

exports._updateCast = async (req, res) => {
    await Cast.updateOne({ _id: req.params._id }, {
        name: req.body.name,
        cover_image: req.body.cover_image,
        birthday: moment(req.body.birthday).format('YYYY-MM-DD'),
        nation: req.body.nation,
        update_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        story: req.body.story
    }, function (err, cast) {
        if (err) {
            res.json({
                result: false,
                message: err.message,
                title: 'update cast  fail'
            })
        } else {
            res.json({
                result: true,
                title: 'update cast ok',
                cast: cast
            })
        }
    })
}

exports._deleteCast = async (req, res) => {
    await Cast.updateOne({ _id: req.params._id }, {
        delete_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }, function (err) {
        if (err) {
            res.json({
                result: false,
                message: err.message,
                title: 'delete cast  fail'
            })
        } else {
            res.json({
                result: true,
                title: 'delete cast ok',
            })
        }
    })
}

