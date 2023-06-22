import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const res = await axios.get(baseUrl)
  return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllUsers }
