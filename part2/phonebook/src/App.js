import { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import {Form, Filter, Persons} from './Components'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [prefix, setNewPrefix] = useState('')

  const baseurl = 'http://localhost:3001/persons'
  const hook = () => {
    axios
      .get(baseurl)
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])


  const addName = (event) => { 
    event.preventDefault()
    let names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObject = {
      name: newName,
      id: uuid(),
      number: newNumber,
    }
    console.log(nameObject)

    axios 
      .post(baseurl, nameObject)
      .then(response => {
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
        setNewPrefix('')
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handlePrefixChange = (event) => {
    console.log(event.target.value)
    setNewPrefix(event.target.value)
  }
  
  // Filter the persons array based on the prefix typed
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(prefix.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter prefix={prefix} handlePrefixChange={handlePrefixChange} />
      <h2>Add a new contact </h2> 
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App