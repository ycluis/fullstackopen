import axios from 'axios'

const baseUrl = '/persons'

const getAllPhonebook = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

const createNewPhonebook = (data) => {
  const req = axios.post(baseUrl, data)
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
export default { getAllPhonebook, createNewPhonebook, updatePhonebook, deletePhonebook }
