import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import {Form, Filter, Persons} from './Components'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: uuid() },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: uuid() },
    { name: 'Dan Abramov', number: '12-43-234345', id: uuid() },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: uuid() }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [prefix, setNewPrefix] = useState('')

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

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    setNewPrefix('')
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