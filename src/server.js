const app = require('../app')
const { PORT } = require('../config')

// Port number
// const PORT = 8000

// tells server which port to listen to
app.listen(PORT, () => {
    console.log(`Server listening on PORT 8000`)
})