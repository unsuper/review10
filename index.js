var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors')

var app = express();
// set layout ejs
app.set('view engine', 'ejs');
app.set('views', './views');
// setting bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// public static folder
app.use(express.static('Publics'));
app.options('*', cors())
const db = require('./Contants/MongoKey').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('mongo connected error:' + err);

    } else {
        console.log('mongo connected ok !');

    }
})

// route film
const Movie = require('./Routes/Movie.route');
Movie(app)
// route category
const Category = require('./Routes/Category.route')
Category(app)
//route category_movie
const Category_Movie = require('./Routes/Category_Movie.route')
Category_Movie(app)
// route user
const User = require('./Routes/User.route')
User(app)
// route cast
const Cast = require('./Routes/Cast.route')
Cast(app)

// route castMovie
const castMovie = require('./Routes/Cast_Movie.route')
castMovie(app)

// route video 
const video = require('./Routes/Video.route')
video(app)

// route views
const views = require('./Routes/Views.route')
views(app)

// History
const History = require('./Routes/History.route')
History(app)

// Evaluate 
const Evaluate = require('./Routes/Evaluate.route')
Evaluate(app)

//comment
const Comment = require('./Routes/Comment.route')
Comment(app)

//Follow
const Follow = require('./Routes/Follow.route')
Follow(app)

// Channel Music
const Channel = require('./Routes/Channel_Music.route')
Channel(app)

// Music
const Music = require('./Routes/Music.route')
Music(app)

app.get('/', (req, res) => {
    // res.end('Welcome');
    res.redirect("dashboard")
});
app.get('/dashboard',(req,res)=>{
    res.render('dashboard');

})


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
