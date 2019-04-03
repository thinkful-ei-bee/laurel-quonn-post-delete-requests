// server variables
const express = require('express');
const app = express();

// app data
const moviedex = require('./moviedex.json')

const morgan = require('morgan')
// logs requests
app.use(morgan('dev'))

// app.use((req, res) => {
//     res.send('Hello')
// })

// handle get resquest to moviedex endpoint
function handleGetMovies(req, res) {
    res.send(moviedex)
}

app.get('/moviedex', handleGetMovies)
const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening on PORT 8000`)
})
