import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 } 
    const response = await axios.post(baseUrl, object)
    return response.data
}

const get = async (id) => {
    const url = `${baseUrl}/${id}`
    console.log(url)
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log(response.data)
    return response.data
}

const update = async newObject => {
    const url = `${baseUrl}/${newObject.id}`
    const response = await axios.put(url, newObject)
    return response.data
}

export default { getAll, createNew, get, update }