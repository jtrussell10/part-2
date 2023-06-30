import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
  return axios.get(baseUrl)
}

const create = nameObject => {
  return axios.post(baseUrl, nameObject)
}

const itemDelete = id => {
  console.log("Id", id)
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}



export default { getAll, create, itemDelete, update}