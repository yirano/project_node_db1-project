const express = require("express")

const db = require("../data/dbConfig.js")

const server = express()

server.use(express.json())



server.get('/accounts', async (req, res, next) => {
  try {
    const accounts = await db
      .select('*')
      .from('accounts')
    res.json(accounts)
  } catch (error) {
    next(error)
  }
})

server.get('/accounts/:id', async (req, res, next) => {
  try {
    const [account] = await db
      .select('*')
      .from('accounts')
      .where('id', req.params.id)
    res.json(account)
  } catch (error) {
    next(error)
  }
})

server.get('/sorted/accounts', async (req, res, next) => {
  try {
    const accounts = await db
      .select('*')
      .from('accounts')
      .limit(5)
    res.json(accounts)
  } catch (error) {
    next(error)
  }
})


server.post('/accounts', async (req, res, next) => {
  try {
    const newAcctID = await db
      .insert(req.body)
      .into('accounts')
    const [newAcct] = await db
      .select('*')
      .from('accounts')
      .where('id', newAcctID)
    res.status(201).json(newAcct)
  } catch (error) {
    next(error)
  }
})

server.put('/accounts/:id', async (req, res, next) => {
  try {
    await db('accounts')
      .update(req.body)
      .where('id', req.params.id)

    const editAcct = await db('accounts')
      .select('*')
      .where('id', req.params.id)

    res.json(editAcct)
  } catch (error) {
    next(error)
  }
})

server.delete('/accounts/:id', async (req, res, next) => {
  try {
    await db('accounts')
      .where('id', req.params.id)
      .del()
    res.status(204).end()
  } catch (error) {
    console.log(error)
  }
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ errorMessage: "Something went wrong" })
})

module.exports = server


/* SELECT DISTINCT "City" FROM 'Customers' */
/* SELECT * FROM  "Suppliers" WHERE LENGTH("SupplierName") > 20 */