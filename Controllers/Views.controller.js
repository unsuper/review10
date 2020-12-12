const Movie = require("../Models/Movie");
const Evaluate = require("../Models/Evaluate");

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
        if(newId1 === newId2){
            let newData = {
                _id: index,
                name: value1.name,
                imdb: value1.score,
                rating: value.score,
                create_at: value1.create_at,
            }
            array.push(newData);
        }
      });
    }
  });

  if(array.length >= 4) {
      res.render("dashboard", {data: array})
  }

};

exports._AddFilm = function (req, res) {
  res.render("Movie_add");
};
