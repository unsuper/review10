const Views = require("../Models/CountViews");

exports.countViewsByMovieId = async (req, res) => {
  await Views.findOne({ movie_id: req.params.movie_id }, function (err, data) {
    if (err) {
      res.json({
        status: -1,
        message: "COUNT VIEWS FAIL: " + err,
      });
    } else {
      if (data.length < 1) {
        let newCount = new views({
            movie_id: req.params.movie_id,
            count: 1,
        });
        newCount.save(function(err){
            if(err){
                res.json({
                    status: -1,
                    message: "add new movie to Count views dtb failed" + err
                })
            }else{
                res.json({
                    status: 1,
                    message: "add new movie to Count views OK"
                })
            }
        })
      }else{
        views.updateOne({_id: data._id}, {count: data.count + 1}, function(err){
            if(err){
                res.json({
                    status: -1,
                    message: err
                })
            }else{
                res.json({
                    status: 1,
                    message: "Tăng views thành công!"
                })
            }
        })
      }
    }
  });
};

exports.getViewsByMovieId = async (req, res) => {
    await Views.findOne({movie_id: req.params.movie_id}, function(err, data){
        if(err){
            res.json({
                status: -1,
                message: "GET VIEWS FAIL: " + err
            })
        }else{
            res.json({
                status: 1,
                views: data.count,
            })
        }
    })
}