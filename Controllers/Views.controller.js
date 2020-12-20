const Movie = require("../Models/Movie");
const Evaluate = require("../Models/Evaluate");
const User = require("../Models/User");
const Chat = require("../Models/chat");

exports._ViewFilm = async function (req, res) {
  let reviewData = await Evaluate.find({}, function (err, data) {
    if (err) {
      return [];
    } else {
      return data;
    }
  }).sort({ score: -1 });

  let movieData = await Movie.find({}, function (err, data) {
    if (err) {
      return [];
    } else {
      return data;
    }
  });

  let array = [];

  await reviewData.forEach((value, index) => {
    if (index < 5) {
      let newId1 = value.movie_id.toString();
      movieData.forEach((value1, index1) => {
        let newId2 = value1._id.toString();
        if (newId1 === newId2) {
          let newData = {
            _id: index,
            name: value1.name,
            imdb: value1.score,
            rating: value.score,
            create_at: value1.create_at,
          };
          array.push(newData);
        }
      });
    }
  });

  let countMovies = await Movie.countDocuments({}, function (err, data) {
    if (err) {
      return [];
    } else {
      return data;
    }
  });

  // if(array.length >= 4) {
  //     res.render("Dashboard", {data: array})
  // }

  res.render("Dashboard", {
    data: array,
    sumMovie: countMovies
  });
};

exports._AddFilm = function (req, res) {
  res.render("Movie_add");
};

exports._UserList = async (req, res) => {
  let currentMonth = new Date().getMonth();

  let countChatByMonth = 0;
  let chat = await Chat.find({}, function (err, data) {
    if (err) {
      res.render({
        status: -1,
        messenger: "CHAT DATA: " + err,
      });
    } else {
      return data;
    }
  });

  let countEval = 0;
  await Evaluate.find({}, function (err, data) {
    if (err) {
      res.render({
        status: -1,
        messenger: "EVALUATE DATA: " + err,
      });
    } else {
      data.map(function (val, ind) {
        if (val.create_at.getMonth() === currentMonth) {
          countEval++;
        }
      });
    }
  });

  await chat.map(function (val, ind) {
    if (val.create_at.getMonth() === currentMonth) {
      countChatByMonth++;
    }
  });

  await User.find({}, function (err, data) {
    if (err) {
      res.render("user", { status: 1 });
    } else {
      let countUserByMonth = 0;
      data.map(function (val, ind) {
        if (val.create_at.getMonth() === currentMonth) {
          countUserByMonth++;
        }
      });
      res.render("user", {
        data: data,
        countComment: countChatByMonth,
        sumRating: countEval,
        sumUser: data.length,
        sumUserMonth: countUserByMonth,
      });
    }
  });
};
