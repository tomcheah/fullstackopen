import { useEffect, useState } from 'react'
import { Persons, PersonForm, Filter, Notification } from './Components'
import { getAll, create, update, remove } from './server'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    let names = persons.map(person => person.name)

    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        console.log(existingPerson)
        const updatedPersonObject = {...existingPerson, number: newNumber}
        update(existingPerson.id, updatedPersonObject)
          .then(returnedPerson => {
            setMessage(`Successfully updated ${newName}'s number`)
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
              console.log(error)
              setMessage(`Information of ${newName} has already been removed from the server`)
              setPersons(persons.filter(person => person.id !== existingPerson.id))
            }
          )
      } 

    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Successfully added ${newName} to Phonebook`)
        })
        .catch(error => {
          setMessage(error.response.data.error)
        })
    }
    setTimeout(() => {
      setMessage('')
    }, 5000)
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (personEntry) => {
    if (window.confirm(`Do you really want to delete contact ${personEntry.name}?`)) {
      remove(personEntry.id)
        .then(setPersons(persons.filter(person => person.id !== personEntry.id)))
    }
  }

  useEffect(() => {
    console.log("effect")
    getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message}/>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a New Contact</h3>

      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>

      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App