import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }
