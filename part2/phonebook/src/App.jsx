import { useState, useEffect } from 'react'
import Numbers from './components/numbers'
import FilterSearch from './components/filter'
import AddContacts from './components/AddContacts'
import personsService from './services/persons'
import Notifications from './components/notification'
import './index.css'
import ErrorMessage from './components/errorComponent'
const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personsService
    .getAll()
    .then(initialList=>{
      setPersons(initialList)
    })    
  }
  useEffect(hook,[])
  
  const addNewName = (event) =>{
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
       const confirmed = confirm(`${newName} is already added to phonebook, want to update their phone number?`);
    if(confirmed){
      const requiredChange = persons.find(person => person.name === newName)
      const requiredId = requiredChange.id
      const newObject = {...requiredChange,number:newNumber}
      personsService.updateContact(requiredId, newObject)
      .then(response => {
        setPersons(persons.map(person => person.id === requiredId ? response.data : person ))
        setNewName('')
        setNewNumber('')
        setNotifMessage('Number updated')
        setTimeout(() => setNotifMessage(null),5000)
      }
      ).catch(error => {
      setErrorMessage(error.response.data.error)
      setTimeout(()=>
        setErrorMessage(null),5000)
      })
      }
      return;
    }
  else {
    
    const personObject = {
      name : newName,
      number: newNumber,
    }
    personsService.create(personObject).then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setNotifMessage(`Added ${newName}`)
      setTimeout(() => setNotifMessage(null),5000)
    }).catch(error => {
      setErrorMessage( error.response.data.error)
      setTimeout(()=>
        setErrorMessage(null),5000)
    })
    
  }
}
  const onNameChange = (event) => {
    setNewName(event.target.value)
  }
  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const onSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  const OnClickButton = id => {
    const isConfirm = confirm(`Do you want to delete this contact?`)
    if(isConfirm){
      personsService.deleteContact(id)
      .then(() =>{
        
        setPersons(persons.filter(n=>n.id!==id))
        setNotifMessage('Contact deleted')
        setTimeout(() => setNotifMessage(null),5000)
        
      })
      .catch((error) =>{
        setErrorMessage('Name has already been removed from phonebook')
        setTimeout(()=>
          setErrorMessage(null),5000)
        
      }
      )
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message = {notifMessage}/>
      <ErrorMessage message = {errorMessage}/>
      <FilterSearch newSearch={newSearch} onSearchChange={onSearchChange} />
      <h2>Add a new contact</h2>
      <AddContacts newName = {newName} onNameChange={onNameChange} 
      newNumber= {newNumber} onNumberChange={onNumberChange} addNewName = {addNewName} />
      <Numbers persons = {filteredPersons} OnClickButton={OnClickButton}/>
      
    </div>
  )
}

export default App