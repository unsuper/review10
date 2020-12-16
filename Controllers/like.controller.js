const Like = require("../Models/like");

exports.like = async (req, res) => {
  const query = {
    user_id: req.body.user_id,
    chat_id: req.body.chat_id,
  };

  const count = await Like.countDocuments(query);

  if (count > 0) {
    Like.findOneAndDelete(query, function (err, result) {
      if (err) {
        res.json({
          status: -1,
          error: err,
        });
      } else {
        res.json({
          status: 1,
          message: "unLiked!",
          like: false,
          unlike: true,
        });
      }
    });
  } else {
    let like = new Like({
      user_id: req.body.user_id,
      chat_id: req.body.chat_id,
    });
    await like.save(function (err, data) {
      if (err) {
        res.json({
          status: -1,
          message: err,
        });
      } else {
        res.json({
          status: 1,
          message: "Like!",
          like: true,
          unlike: false,
        });
      }
    });
  }
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
