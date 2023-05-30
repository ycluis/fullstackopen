const phonebookRouter = require('express').Router()
const Phonebook = require('../models/phonebook')

phonebookRouter.get('/info', (req, res, next) => {
  Phonebook.count()
    .then((count) => res.status(200).type('html').send(`<p>Phonebook has info for ${count}</p><br>${new Date()}`))
    .catch((err) => {
      next(err)
    })
})

phonebookRouter.get('/persons', (req, res, next) => {
  Phonebook.find({})
    .then((personData) => {
      res.status(200).json(personData)
    })
    .catch((err) => {
      next(err)
    })
})

phonebookRouter.get('/persons/:id', (req, res, next) => {
  const person = Phonebook.findById(req.params.id)

  person
    .then((personData) => {
      if (!personData) {
        return res.status(404).json({ error: 'Person not found' })
      }
      return res.status(200).json(personData)
    })
    .catch((err) => {
      next(err)
    })
})

phonebookRouter.delete('/persons/:id', (req, res, next) => {
  const person = Phonebook.findById(req.params.id)
  person
    .then((personData) => {
      if (!personData) {
        return res.status(404).json({ message: 'Person not found' })
      } else {
        Phonebook.findByIdAndDelete(req.params.id).then(() => res.status(204).end())
      }
    })
    .catch((err) => {
      next(err)
    })
})

phonebookRouter.post('/persons', (req, res, next) => {
  const { name, number } = req.body
  const newPerson = new Phonebook({ name, number })

  Phonebook.findOne({ name }).then((person) => {
    if (person) {
      Phonebook.findOneAndUpdate({ name }, { number }, { new: true })
        .then((updatedPerson) => res.status(200).json(updatedPerson))
        .catch((err) => next(err))
    } else {
      newPerson
        .save()
        .then((savedPerson) => res.status(201).json(savedPerson))
        .catch((err) => {
          next(err)
        })
    }
  })
})

phonebookRouter.put('/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ msg: 'Please fill in all the fields' })
  }
  const newPerson = { name, number }
  Phonebook.findByIdAndUpdate(req.params.id, newPerson, { new: true, runValidators: true, context: 'query' })
    .then((updatedPhonebook) => res.status(200).json(updatedPhonebook))
    .catch((err) => next(err))
})

module.exports = phonebookRouter
