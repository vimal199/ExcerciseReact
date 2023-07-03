import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
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
  const persons = props.displayperson
  return (
    <ul>
      {
        persons.map(
          (person) => {
            return <li key={person.id}>{person.name} <span>{person.number}</span></li>
          }
        )
      }
    </ul>
  )
}
function App() {
  const [persons, setPersons] = useState(
    [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  )
  const [currPerson, setCurrPerson] = useState(
    [...persons]
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
      alert(`${newName} is already added to phonebook`)
      return false
    }
    const FinalAdd = persons.concat(person)
    setPersons(FinalAdd)
    setCurrPerson(FinalAdd)
    setNewName('')
    setNewNumber('')
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
      <Filter changeFilter={handleChangeFilter}></Filter>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleAdd={handleAdd} handleOnChange={handleOnChange} handleOnChangeNumber={handleOnChangeNumber}>
      </PersonForm>
      <h1>numbers</h1>
      <Persons displayperson={currPerson} />
    </div>
  );
}

export default App;
