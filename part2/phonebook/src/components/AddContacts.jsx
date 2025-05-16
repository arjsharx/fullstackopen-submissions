const AddContacts =({newName,onNameChange, newNumber, onNumberChange, addNewName }) =>{
    return (
        <form>
        <div>
          name: <input value = {newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value = {newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button onClick={addNewName} type="submit">add</button>
        </div>
      </form>

    )
}
export default AddContacts