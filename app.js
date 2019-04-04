//auth credss
require('dotenv').config()
const  uuid = require('uuid');
//cors
const cors = require('cors')
// server variables
const express = require('express');
const app = express();

// logs env variable to the console
console.log(`@line9 >>> process.env.API_TOKEN = ${process.env.API_TOKEN}`)
// app data
let moviedex = require('./moviedex.json')

// logs requestsm  details
const morgan = require('morgan')
app.use(morgan('dev'))

//parses the body response
app.use(express.json());

app.use(cors())
app.use(express.static('public'));

// validates client token against env token
app.use(function validateBearerToken(req, res, next) {

    console.log('validate bearer token working as it should!')

    // client token
    const bearerToken = req.query.token;

    // env token
    const apiToken = process.env.API_TOKEN

    // move to the next middleware
    next();
})

// handles API request results
function handleGetMovies(req, res) {
    // creates request variables
    const {genre, country, avg_vote} = req.query;

    // app movie data
    let movies = moviedex;

    // filters results accorign to user input
    if (genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
        if (!movies.length) {
            res
                .status(404)
                .send('That resource was not found, try another search')
        }
    } else if (country) {
        movies = movies.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()));
        if (!movies.length) {
            res
                .status(404)
                .send('That resource was not found, try another search')
        }
    } else if (avg_vote) {
        movies = movies.filter(movie => Number(movie.avg_vote) === Number(avg_vote));
        if (!movies.length) {
            res
                .status(404)
                .send('That resource was not found, try another search')
        }
    }
    
    res.send(movies)
    // returns filtered movies list to the client

}

// moviedex API call
app.get('/movie', handleGetMovies)

function handlePostMovies(req, res) {
    // actors : "Mickey Rourke, Steve Guttenberg, Ellen Barkin" avg_vote : 7.1
    // country : "United States" director : "Barry Levinson" duration : 95
    // film_title : "Diner" filmtv_ID : 18 genre : "Comedy" votes : 14 year : 1982
    const {film_title, year, actors, avg_vote, country, movieId} = req.body;
    let newMovieProps = {"country": country, "avg_vote": avg_vote, "actors": actors, "year": year, "film_title": film_title, "movieId": movieId};
    // validates user input
    
    if (!actors || !avg_vote || !country) {
        return res
            .status(400)
            .send('All fields required!')
    }

    if (isNaN(year)) {
        return res
            .status(400)
            .send('Year must contain numbes only!!!')
    }

    if (isNaN(avg_vote)) {
        return res
            .status(400)
            .send('Avg_vote must contain numbes only!!!')
    }

    if (film_title.length < 4 && film_title > 20) {
        return res
            .status(400)
            .send('Title must be atleast 4 chars and no more than 20 chars')
    }

    if (actors.length < 2) {
        return res
            .status(400)
            .send('Actors name must be 2 chars or longer!!!')
    }

    if (country.length < 4) {
        return res
            .status(400)
            .send('Country must be 4 chars or longer!!!')
    }

    moviedex = [...moviedex, newMovieProps];

    console.log(req.body);
    res.send('POST Request received');
};

// handles post requests
app.post('/movie', handlePostMovies)

// Port number
const PORT = 8000

// tells server which port to listen to
app.listen(PORT, () => {
    console.log(`Server listening on PORT 8000`)
})
