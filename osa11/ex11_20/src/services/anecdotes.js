import axios from 'axios'

const baseUrl = '/api/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('getAll vastaus responssi: ',response.data)
  return {type: 'GET_ALL', payload: response.data}
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
  const object = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

// 6.17
const vote = async (id, object) => {
  //console.log('objecti votetessa', object);
  const newObj = { ...object, votes: object.votes+1 }
  //console.log('newObj', newObj);
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data
}
export default { getAll, createNew, vote }