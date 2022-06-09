const Persons = ( {persons} ) => {
    return (
      persons.map(person => <PersonsDisplay key={person.id} name={person.name} number={person.number}/>)
    )
  }
  
const PersonsDisplay = ( {name, number} ) => <div>{name} {number}</div>
  
const Filter = ({prefix, handlePrefixChange}) => {
return (
    <div>
    filter shown with <input value={prefix} onChange={handlePrefixChange} />
    </div>
)
}

const Form = ({newName, newNumber, handleNameChange, handleNumberChange, addName}) => {
return (
    <div>
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
</div>
)
}

export {
    Persons,
    PersonsDisplay,
    Form,
    Filter,
}