import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  /* const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data) */
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  //console.log('likeBlog frontendin updeittaus id', id, 'newObject', newObject)
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  //console.log('likeBlog frontendin updeittaus response', response)
  return response.data
}

const remove = async (id) => {
  /* const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data) */
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const comment = async (id, comment) => {
  //console.log('frontin kommentti serviisi', comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}
// 7.18 commentointi

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { setToken, create, update, remove, getAll, comment }
