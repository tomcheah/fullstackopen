import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(response => response.data)
}

export const createAnecdote = (newAnecdote) => {
    if (newAnecdote.content.length < 5) {
        throw new Error('anecdote must be at least 5 characters long')
    }

    return axios.post(baseUrl, newAnecdote).then(response => response.data)
}

export const updateAnecdote = (anecdote) => {
    return axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(response => response.data)
}