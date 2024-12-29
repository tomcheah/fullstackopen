const Persons = ( {persons} ) => {
  return (
    <div>
      {persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
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

export { Filter, PersonForm, Persons };