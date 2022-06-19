import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import {Form, Filter, Person} from './Components'
import service from './server.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [prefix, setNewPrefix] = useState('')

  const hook = () => {
    service
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
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

    service
      .create(nameObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject))
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

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
        service.deletePerson(id)
        setPersons(persons.filter(person => person.id !== id))
    } 
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
      <div>
        {personsToShow.map(person => 
          <Person 
            key={person.id}
            name={person.name}
            number={person.number}
            handleDelete={() => handleDelete(person.name, person.id)}
          />
        )}  
      </div> 
    </div>
  )
}

export default App