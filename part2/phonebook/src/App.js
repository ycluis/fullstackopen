import './style/index.css'
import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Person from './Person'
import Notification from './Notification'
import phonebookService from './services/phonebook'

const App = () => {
  useEffect(() => {
    phonebookService.getAll().then((res) => {
      setPersons(res)
    })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [msg, setMsg] = useState(null)

  const notificationTiming = () => {
    setTimeout(() => {
      setMsg(null)
    }, 3000)
  }

  const addPerson = (e) => {
    e.preventDefault()

    if (!newName || !newNumber) {
      alert(`Please fill in all the fields`)
    } else {
      const isExist = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

      if (isExist) {
        // alert(`${newName} is already added to phonebook`)
        if (window.confirm(`${isExist.name} is already added to phonebook, replace the old number with a new one?`)) {
          const res = phonebookService.updatePhonebook({ name: isExist.name, number: newNumber, id: isExist.id })
          res
            .then((resData) => setPersons(persons.map((person) => (person.id === resData.id ? resData : person))))
            .catch((err) => {
              console.log(err.response.data.error)
              setMsg({ status: 'error', message: err.response.data.error })
            })

          setMsg({ status: 'success', message: `Updated ${isExist.name}` })
          notificationTiming()
        }
      } else {
        const res = phonebookService.createNew({
          name: newName,
          number: newNumber,
          id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 1,
        })
        res
          .then((resData) => {
            setPersons(persons.concat(resData))
            setMsg({ status: 'success', message: `Added ${newName}` })
          })
          .catch((err) => {
            console.log(err.response.data.error)
            setMsg({ status: 'error', message: err.response.data.error })
          })

        notificationTiming()
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

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const res = phonebookService.deletePhonebook(person.id)
      res
        .then((resData) => {
          if (resData.status === 204) {
            setPersons(persons.filter((personData) => personData.id !== person.id))
          }
        })
        .catch(() => {
          setMsg({ status: 'error', message: `Information of ${person.name} has already been removed from server` })
          notificationTiming()
          setPersons(persons.filter((personData) => personData.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification msg={msg} />

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

      <Person filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
