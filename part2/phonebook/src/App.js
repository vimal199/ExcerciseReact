import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import personService from './services/persons'
const SuccessMsg = ({ message }) => {
  const errorStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message == '') {
    return null
  }
  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}
const ErrorMessage = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message == '') {
    return null
  }
  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}
const Filter = (props) => {
  return (
    <>
      <span>filter shown with</span> <input onChange={props.changeFilter} />
    </>
  )
}
const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleAdd}>

      name : <input onChange={props.handleOnChange} value={props.newName} />
      <br />
      number : <input onChange={props.handleOnChangeNumber} value={props.newNumber} />

      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}
const Persons = (props) => {
  const persons1 = props.displayperson
  const setCurrPerson = props.setCurrPerson
  const setPersons = props.setPersons
  const persons = props.persons
  const handleDelete = (id) => {
    if (window.confirm("Do you really want to Delete?")) {
      console.log(id);
      personService
        .deletePerson(id)
        .then(
          setCurrPerson(persons1.filter(
            (person) => person.id !== id
          )
          ),
          setPersons(persons.filter(
            (person) => person.id !== id
          )
          )

        )
      alert('Deleted')
    } else {
      alert('Not Deleted')
    }
  }
  return (
    <ul>
      {
        persons1.map(
          (person) => {
            return (
              <li key={person.id}>{person.name} <span>{person.number}</span>
                <button type='buton' onClick={() => handleDelete(person.id)}>Delete</button>
              </li>
            )
          }
        )
      }
    </ul>
  )
}
function App() {
  /*const [persons, setPersons] = useState(
    [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  )*/
  const [persons, setPersons] = useState([])
  const [currPerson, setCurrPerson] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  useEffect(() => {
    console.log("Fetching data")
    personService.getAll().then(
      response => {
        console.log("promise fulfilled");
        setPersons(response.data)
        setCurrPerson(response.data)
      }
    )
  }, []
  )

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleOnChange = (event) => {
    setNewName(event.target.value)
  }
  const handleAdd = (event) => {
    event.preventDefault()
    const person = { name: newName, number: newNumber }
    const isDup = persons.find(
      (per) => newName === per.name
    )
    if (isDup !== undefined && isDup.name === newName) {
      // alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        //code for update
        personService.update(isDup.id, person)
          .then(
            (response) => {
              setPersons(
                persons.map(
                  person => person.id != isDup.id ? person : response.data
                )
              )
              setCurrPerson(
                persons.map(
                  person => person.id != isDup.id ? person : response.data
                )
              )
              setNewName('')
              setNewNumber('')
            }
          )
          .catch((err) => {
            if (err.response.status == '404') {
              setErrorMessage(`Information of ${person.name} has already been removed from server`)
              setTimeout(
                () => {
                  setErrorMessage('')
                }, 5000
              )
            }
          }
          )
        // return false
      } else {
        return false
      }
    } else {
      personService
        .create(person)
        .then(
          (response) => {
            setPersons(persons.concat(response.data))
            setCurrPerson(persons.concat(response.data))
            setSuccessMessage(`Added ${person.name}`)
            setTimeout(
              () => {
                setSuccessMessage('')
              }, 5000
            )
          }
        ).catch(
          (error) => {
            console.log(error.response.data.error)
            setErrorMessage(error.response.data.error)
          }
        )
      setNewName('')
      setNewNumber('')
    }
  }
  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleChangeFilter = (event) => {
    if (event.target.value == '') {
      setCurrPerson(persons)
      return
    }
    const filtered = persons.filter(
      (person) => {
        return person.name.toLowerCase().includes(event.target.value.toLowerCase())
      }
    )
    setCurrPerson(filtered.length > 0 ? filtered : [])
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessMsg message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter changeFilter={handleChangeFilter}></Filter>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleAdd={handleAdd} handleOnChange={handleOnChange} handleOnChangeNumber={handleOnChangeNumber}>
      </PersonForm>
      <h1>numbers</h1>
      <Persons displayperson={currPerson} setCurrPerson={setCurrPerson} setPersons={setPersons} persons={persons} />
    </div>
  );
}

export default App;
