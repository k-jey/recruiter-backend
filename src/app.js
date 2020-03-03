const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const jobRouter = require('./routers/job')

const app = express()
app.use(cors())

app.use(express.json())
app.use(userRouter)
app.use(jobRouter)

module.exports = app