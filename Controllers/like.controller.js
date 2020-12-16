const Like = require("../Models/like");

exports.like = async (req, res) => {
  let query = {
    user_id: req.body.user_id,
    chat_id: req.body.chat_id,
  };
  await Like.find(
    query,
    function (err, result) {
      if (err) {
        res.json({
          message: err,
          result: result,
        });
      } else {
        if (result.length === 0) {
          let like = new Like(query);
          like.save(function (err, data) {
            if (err) {
              res.json({
                status: -1,
                message: err,
              });
            } else {
              res.json({
                status: 1,
                message: "Like!",
                result: data,
              });
            }
          });
        } else {
          Like.deleteOne(query, function(err, result) {
            if(err){
              res.json({
                status: -1,
                message: err,
              })
            }else{
              res.json({
                status: 1,
                message: "unLike!"
              })
            }
          })
        }
      }
    }
  );
};

exports.isLikeComment = async (req, res) => {
  await Like.find({ user_id: req.params.user_id }, function (err, data) {
    if (err) {
      res.json({
        status: -1,
        message: err,
      });
    } else {
      res.json({
        status: 1,
        data: data,
      });
    }
  });
};

exports.countLike = async (req, res) => {
  await Like.countDocuments(
    { chat_id: req.params.chat_id },
    function (err, data) {
      if (err) {
        res.json({
          status: -1,
          message: err,
        });
      } else {
        res.json({
          status: 1,
          data: data,
        });
      }
    }
  );
};
