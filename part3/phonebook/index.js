require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./models/phonebook')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join(' ')
  }),
)

// const persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ]

app.use(express.static('build'))

app.get('/info', (req, res) => {
  Phonebook.count().then((count) =>
    res.status(200).type('html').send(`<p>Phonebook has info for ${count}</p><br>${new Date()}`),
  )
})

app.get('/api/persons', (req, res) => {
  Phonebook.find({}).then((personData) => {
    res.status(200).json(personData)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const person = Phonebook.findById(req.params.id)

  person.then((personData) => {
    if (!personData) {
      return res.status(404).json({ error: 'Person not found' })
    }

    return res.status(200).json(personData)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const person = Phonebook.findById(req.params.id)
  person.then((personData) => {
    if (!personData) {
      return res.status(404).json({ message: 'Person not found' })
    } else {
      Phonebook.findByIdAndDelete(req.params.id).then(() => res.status(204).end())
    }
  })
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }

  // if (persons.find((person) => person.name.toLowerCase() === name.toLowerCase())) {
  //   return res.status(400).json({ error: 'name must be unique' })
  // }

  const newPerson = new Phonebook({ name, number })

  newPerson.save().then((savedPerson) => res.status(201).json(savedPerson))
})

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`))
