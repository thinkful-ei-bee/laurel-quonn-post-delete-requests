// server variables
const express = require('express');
const app = express();

const morgan = require('morgan')
// logs requests
app.use(morgan('dev'))

app.use((req, res) => {
    res.send('Hello, World')
})

const PORT = 8000 

app.listen(PORT, () => {
    console.log(`Server listening on PORT 8000`)
})



