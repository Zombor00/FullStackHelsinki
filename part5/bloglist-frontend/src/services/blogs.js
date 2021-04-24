import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const change = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const blogs = { getAll, setToken, create, change }
export default blogs