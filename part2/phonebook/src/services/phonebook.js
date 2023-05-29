import axios from 'axios'

// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  const req = axios.get(`${baseUrl}`)
  return req.then((all) => all.data)
}

const createNew = (data) => {
  const req = axios.post(`${baseUrl}`, data)
  return req.then((res) => res.data)
}

const updatePhonebook = (person) => {
  const req = axios.put(`${baseUrl}/${person.id}`, person)
  return req.then((res) => res.data)
}

const deletePhonebook = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then((res) => res)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, deletePhonebook, updatePhonebook }
