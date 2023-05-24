import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Person from './Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    if (!newName || !newNumber) {
      alert(`Please fill in all the fields`)
    } else {
      const newPersons = [...persons]

      const isExist = persons.filter((person) => person.name === newName)

      if (isExist.length > 0) {
        alert(`${newName} is already added to phonebook`)
      } else {
        newPersons.push({ name: newName, number: newNumber, id: newPersons[newPersons.length - 1].id + 1 })
        setPersons(newPersons)
      }

      setFilter('')
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFieldChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        handleSubmit={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleFieldChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Person filter={filter} persons={persons} />
    </div>
  )
}

export default App
