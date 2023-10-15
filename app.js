const express = require('express')
const bodyParser = require('body-parser')
const env = require('./env')

const app = express()
const PORT = env.port || '3000'

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app