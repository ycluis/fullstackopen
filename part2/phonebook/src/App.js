import './style/index.css'
import { useState, useEffect } from 'react'
import Notification from './Notification'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Person from './Person'

import phonebookService from './services/phonebook'

const App = () => {
  useEffect(() => {
    phonebookService.getAllPhonebook().then((res) => {
      setPersons(res)
    })
  }, [])

  const [msg, setMsg] = useState(null)
  const [persons, setPersons] = useState([])
  const [field, setField] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  const clearNotification = () => {
    setTimeout(() => {
      setMsg(null)
    }, 3000)
  }

  const handleFieldChange = (e) => {
    const copy = { ...field }
    setField({
      ...copy,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!field.name || !field.number) {
      alert(`Please fill in all the fields`)
    } else {
      const exists = persons.find((person) => person.name.toLowerCase() === field.name.toLowerCase())

      if (exists) {
        if (window.confirm(`${exists.name} is already added to phonebook, replace the old number with a new one?`)) {
          const res = phonebookService.updatePhonebook({ name: exists.name, number: field.number, id: exists.id })
          res
            .then((data) => setPersons(persons.map((person) => (person.id === data.id ? data : person))))
            .catch((err) => {
              console.log(err.response.data.error)
              setMsg({ status: 'error', message: err.response.data.error })
            })

          setMsg({ status: 'success', message: `Updated ${exists.name}` })
          clearNotification()
        }
      } else {
        const res = phonebookService.createNewPhonebook({
          name: field.name,
          number: field.number,
          id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 1,
        })
        res
          .then((data) => {
            setPersons(persons.concat(data))
            setMsg({ status: 'success', message: `Added ${field.name}` })
          })
          .catch((err) => {
            console.log(err.response.data.error)
            setMsg({ status: 'error', message: err.response.data.error })
          })

        clearNotification()
      }

      setFilter('')
      setField({ name: '', number: '' })
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const res = phonebookService.deletePhonebook(person.id)
      res
        .then((data) => {
          if (data.status === 200) {
            setPersons(persons.filter((data) => data.id !== person.id))
          }
        })
        .catch(() => {
          setMsg({ status: 'error', message: `Information of ${person.name} has already been removed from server` })
          clearNotification()
          setPersons(persons.filter((data) => data.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={msg} />
      <Filter filter={filter} handleFilterChange={(e) => setFilter(e.target.value)} />

      <h3>Add a new</h3>
      <PersonForm field={field} handleFieldChange={handleFieldChange} handleSubmit={handleSubmit} />

      <h3>Numbers</h3>
      <Person filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
