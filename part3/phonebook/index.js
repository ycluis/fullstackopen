const express = require('express')
const morgan = require('morgan')
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

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.use(express.static('build'))

app.get('/info', (req, res) => {
  const ppl = [...persons]
  res.status(200).type('html').send(`<p>Phonebook has info for ${ppl.length}</p><br>${new Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((person) => person.id === +req.params.id)
  if (person) {
    return res.status(200).json(person)
  } else {
    return res.status(404).json({ message: 'Person not found' })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const person = persons.find((person) => person.id === +req.params.id)
  if (!person) {
    return res.status(404).json({ message: 'Person not found' })
  } else {
    persons = persons.filter((person) => person.id !== +req.params.id)
    return res.status(204).end()
  }
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'Please fill in all the fields' })
  }

  if (persons.find((person) => person.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = { id: Math.floor(Math.random() * 100), name, number }

  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`))
