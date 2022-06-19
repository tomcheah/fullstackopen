const Person = ( {name, number, id, handleDelete} ) =>{
    return (
        <div> 
            {name} {number} <button onClick={() => handleDelete(name, id)}> Delete </button>
        </div>
    )
}
  
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
    Person,
    Form,
    Filter,
}