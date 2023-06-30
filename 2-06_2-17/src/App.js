import { useState, useEffect } from 'react'
import nameService from './services/persons'


const Filter = ({filter, handler}) => {
  return (
  <div>
       <input value = {filter} onChange = {handler} />
  </div>)
}

const Notification = ({ message, style }) => {
  if (message == null) {
    return null
  }

  return (
    <div className={style}>
       {console.log(style)}
      {message}
    </div>
  )
}


const DeleteButton = ({id, handleDelete}) => {
  return (<button onClick={() => handleDelete(id)}>
    Delete
  </button>)
}

const Note = ({ note, handleDelete }) => {
  return (
    <div>{note.name}: {note.number}
    <DeleteButton id = {note.id} handleDelete={handleDelete} />
    </div>
  )
}

const Form = ({addName, newName, newNumber, nameHandler, numberHandler}) => {
  return(
  <form onSubmit={addName}>
    <div>
      name: <input value = {newName} onChange={nameHandler}/>
    </div>
    <div>number: <input value = {newNumber} onChange={numberHandler}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)}

const Numbers = ({namesToShow, handleDelete}) => {
  return (
    namesToShow.map(person => <Note key = {person.name} note = {person} handleDelete={handleDelete}/>)
  )
}
 
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState("success")

 const handleDelete = (id) => {
  const personToDelete = persons.find(person => person.id === id);
  
  if(window.confirm(`Delete ${personToDelete.name}?`)) {
    nameService
      .itemDelete(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        if (error.response.status == 404){ setErrorMessage(
          `${personToDelete.name} was already removed from the server`
        )
        setErrorStyle("error")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.name !== personToDelete.name))}
        console.log(error)
      }
      );
  }
}
  
  useEffect(() => {
    nameService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  
    const existingPerson = persons.find((person) => newName === person.name)
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Substitute the new number?`
      )
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        nameService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response.data
              )
            )
            setErrorMessage(
              `${existingPerson.name}'s new number was added to the server`
            )
            setErrorStyle("success")
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.log('There was an error:', error)
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
  
      nameService
        .create(nameObject)
        .then((response) => {
          console.log(response)
          console.log(response.data)
          setPersons(persons.concat(response.data))
          setErrorMessage(
            `${nameObject.name} was succeessfully added to the phonebook`
          )
          setErrorStyle("success")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          console.log('There was an error:', error)
        })
    }
  }
  


  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  
  const namesToShow = persons.filter(list => list.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={errorStyle}/>
      <h3>Filter numbers</h3>
      <Filter filter = {filter} handler = {handleFilterChange} />
      <h3> Add a new contact</h3>
      <Form addName = {addName} newName = {newName} newNumber = {newNumber} 
      nameHandler = {handleNameChange} numberHandler = {handleNumberChange}/>
      <h3>Names and numbers</h3>
      <Numbers namesToShow={namesToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App

