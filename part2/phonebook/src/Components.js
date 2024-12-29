const Persons = ( {persons, deletePerson} ) => {
  return (
    <div>
      {persons.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>)}
    </div>
  )
}

const Filter = ( {newFilter, handleFilterChange} ) => {
  return (
    <div>
      filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ( {addName, newName, handleNameChange, newNumber, handleNumberChange} ) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={addName}>add</button>
      </div>
    </form>
  )
}

const Notification = ({ message }) => {
  if (message === null || message === '') {
    return null
  } 

  const className = message.includes('Successfully') ? 'success' : 'error'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export { Filter, PersonForm, Persons, Notification };