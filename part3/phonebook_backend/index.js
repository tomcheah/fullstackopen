require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// app.get('/info', (request, response) => {
//     response.write(`<h1>Phonebook has info for ${persons.length} people</h1>`)
//     response.write(`<p>${new Date()}</p>`)
//     response.send()
// })

app.delete('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    // persons = persons.filter(note => note.id !== id)

    Person.findById(request.params.id).then(person => {
      response.json(person)
    })

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    // if (persons.find(person => person.name === body.name)) {
    //     return response.status(400).json({ error: 'name must be unique' })
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})