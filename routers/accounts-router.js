const express = require('express')
const db = require('../data/accounts-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const accounts = await db.find()
    res.json(accounts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const account = await db.findById(req.params.id)
    res.json({ result: account })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const payload = {
    "name": req.body.name,
    "budget": req.body.budget
  }
  try {
    const newAcct = await db.add(payload)
    res.status(201).json({ result: newAcct })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const editPost = await db.update(req.params.id, req.body)
    res.json(editPost)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const delAccount = await db.remove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router