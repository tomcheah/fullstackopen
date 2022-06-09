import { useState } from 'react'
import { v4 as uuid } from 'uuid';


const PersonsDisplay = ( {name, number} ) => <div>{name} {number}</div>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: uuid(), number: "123-567-7890" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  
// todo: fix how persons are displayed/ rendered
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <PersonsDisplay key={person.id} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App