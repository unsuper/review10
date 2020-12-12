const User = require('../Models/User')
const Movie = require('../Models/Movie')
const Comment = require('../Models/Comment')
const Evaluate = require('../Models/Evaluate')
const moment = require('moment')
const Follow = require('../Models/Follows')
const { populate } = require('../Models/Comment')
const TypeFollow = {
    movie: 'movie',
    cast: 'cast'
}


exports._addFollow = async (req, res) => {
    if (req.params.type === TypeFollow.movie) {
        Follow.findOne({ 'user_id': req.body.user_id, 'movie_id': req.body.movie_id }, function (err, data) {
            if (err) {
                res.json({
                    result: false,
                    message: 'Follow movie fail ' + err.message,
                    position: 500
                })
            } else {
                if (data) {
                    res.json({
                        result: false,
                        message: 'Movie đã follow rồi nhé ~~',
                        position: 400,
                        items: data
                    })
                } else {
                    let newFollow = new Follow({
                        create_at: moment().format('YYYY-MM-DD'),
                        movie_id: req.body.movie_id,
                        type: req.params.type,
                        user_id: req.body.user_id
                    })

                    newFollow.save(function (e) {
                        if (e) {
                            res.json({
                                result: false,
                                message: 'create Follow fail' + e.message,
                                position: 300
                            })
                        } else {
                            res.json({
                                result: true,
                                message: 'create ok ',
                                position: 200,
                                id: newFollow._id
                            })
                        }
                    })
                }
            }
        })
    } else if (req.params.type === TypeFollow.cast) {
        Follow.findOne({ 'user_id': req.body.user_id, 'cast_id': req.body.cast_id }, function (err, data) {
            if (err) {
                res.json({
                    result: false,
                    message: 'Follow cast fail ' + err.message,
                    position: 500
                })
            } else {
                if (data) {
                    res.json({
                        result: false,
                        message: 'Cast đã follow rồi nhé ~~',
                        position: 400,
                        items: data
                    })
                } else {
                    let newFollow = new Follow({
                        create_at: moment().format('YYYY-MM-DD'),
                        cast_id: req.body.cast_id,
                        type: req.params.type,
                        user_id: req.body.user_id
                    })

                    newFollow.save(function (e) {
                        if (e) {
                            res.json({
                                result: false,
                                message: 'create Follow fail' + e.message,
                                position: 300
                            })
                        } else {
                            res.json({
                                result: true,
                                message: 'create ok ',
                                position: 200,
                                id: newFollow._id
                            })
                        }
                    })
                }
            }
        })
    }

}

exports._deleteFollow = async (req, res) => {
    if (req.params.type === TypeFollow.movie) {
        Follow.deleteOne({ 'user_id': req.params.user_id, 'movie_id': req.params._id }, function (err) {
            if (err) {
                res.json({
                    result: false,
                    message: 'delete follow fail ' + err.message,
                    position: 400
                })
            } else {
                res.json({
                    result: true,
                    message: 'delete follow movie ok',
                    position: 200,

                })
            }
        })
    } else if (req.params.type === TypeFollow.cast) {
        Follow.deleteOne({ 'user_id': req.params.user_id, 'cast_id': req.params._id }, function (err) {
            if (err) {
                res.json({
                    result: false,
                    message: 'delete follow fail ' + err.message,
                    position: 400
                })
            } else {
                res.json({
                    result: true,
                    message: 'delete follow cast ok',
                    position: 200,

                })
            }
        })
    }
}


exports._findFollowUser = async (req, res) => {
    if (req.params.type === TypeFollow.movie) {
        Follow.find({ 'user_id': req.params.user_id, 'type': req.params.type }).populate('movie_id').exec(function (err, data) {
            if (err) {
                res.json({
                    result: false,
                    message: 'find follow by user fail ' + err.message,
                    position: 400
                })
            } else {
                res.json({
                    result: true,
                    message: 'find follow by user ok',
                    position: 200,
                    items: data
                })
            }
        })
    } else if (req.params.type === TypeFollow.cast) {
        Follow.find({ 'user_id': req.params.user_id, 'type': req.params.type }).populate('cast_id').exec(function (err, data) {
            if (err) {
                res.json({
                    result: false,
                    message: 'find follow by user fail ' + err.message,
                    position: 400
                })
            } else {
                res.json({
                    result: true,
                    message: 'find follow by user ok',
                    position: 200,
                    items: data
                })
            }
        })
    }
}

exports._deleteAllFollow = async (req, res) => {
    await Follow.remove({ 'user_id': req.params.user_id }, function (err) {
        if (err) {
            res.json({
                result: false,
                ping: 999,
                message: 'delete all follow by user fail ' + err.message
            })
        } else {
            res.json({
                result: true,
                ping: 1,
                message: 'delete ok '
            })
        }
    })
}