import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDITAUTHOR } from '../queries';
import Select from 'react-select'
import React, { useState } from 'react';
import { gql } from '@apollo/client';
const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [changeAuthor] = useMutation(EDITAUTHOR, {
    onError: (error) => {
      console.log(error);
    }
  })
  if (result.loading) {
    return <div>Loading...</div>
  }
  const authors = result.data.allAuthors
  console.log(authors);

  const handleNameChange = (event) => { setName(event.target.value) }
  const handleBornChange = (event) => { setBorn(event.target.value) }
  const handleUpdateAuthor = (event) => {
    event.preventDefault()
    const setBornTo = parseInt(born)
    changeAuthor({ variables: { name, setBornTo } })
    console.log('dfdfd');
  }
  const AuthorList = () => {
    return authors.map(
      (author) => {
        return { value: author.name, label: author.name }
      }
    )
  }
  console.log('AuthorList is', AuthorList);
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleUpdateAuthor}>
          {/*  <label htmlFor="name">Name</label><br />
          <input value={name} name='name' onChange={handleNameChange} /> <br /> */}
          <Select options={AuthorList()} onChange={(selected) => { setName(selected.value) }}></Select>
          <label htmlFor="born">Born</label><br />
          <input value={born} name='born' onChange={handleBornChange} /><br />
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
