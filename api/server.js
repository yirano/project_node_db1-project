const express = require("express")

const db = require("../data/dbConfig.js")

const server = express()

server.use(express.json())

server.get('/', async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ errorMessage: "Something went wrong" })
})

module.exports = server
