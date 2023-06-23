import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAllBlog = async () => {
  const res = await axios.get(baseUrl)
  return res
}

const createNewBlog = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res
}

const updateBlog = async (newObject, id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return res
}

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res
}

const addComment = async (id, content) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.post(`${baseUrl}/${id}/comments`, { content }, config)
  return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAllBlog, createNewBlog, updateBlog, deleteBlog, addComment }
