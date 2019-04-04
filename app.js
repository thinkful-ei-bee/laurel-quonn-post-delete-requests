//auth credss
require('dotenv').config()

// server variables
const express = require('express');
const app = express();

// logs env variable to the console
console.log(`@line9 >>> process.env.API_TOKEN = ${process.env.API_TOKEN}`)
// app data
const moviedex = require('./moviedex.json')

// logs requestsm  details
const morgan = require('morgan')
app.use(morgan('dev'))

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
    const {genre,country,avg_vote} = req.query;
    
    // app movie data
    let movies = moviedex;
    
    // filters results accorign to user input
    if (genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
    }else if(country){
        movies = movies.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()));
    }else if(avg_vote){
        movies = movies.filter(movie => Number(movie.avg_vote) === Number(avg_vote));
    }

    // returns filtered movies list to the client
    res.send(movies)
}

// moviedex API call
app.get('/movie', handleGetMovies)

// Port number
const PORT = 8000

// tells server which port to listen to
app.listen(PORT, () => {
    console.log(`Server listening on PORT 8000`)
})
