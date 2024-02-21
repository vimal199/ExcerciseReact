import { gql, useMutation } from '@apollo/client';
import { useState } from 'react'
import React from 'react';
import { addBook } from '../queries';
import { ALL_AUTHORS, ALLBOOKS } from '../queries';
const NewBook = (props) => {
  if (!props.show) {
    return null
  }
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBooks] = useMutation(addBook, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALLBOOKS }],
    /*   update: (cache, response) => {
        cache.updateQuery({ query: ALLBOOKS }, ({ allBooks }) => {
          console.log('response data ', x);
          return {
            allBooks: allBooks.concat(response.data.addBook)
          }
        }
        )
      } */
  })

  const submit = async (event) => {
    event.preventDefault()
    createBooks({ variables: { title, author, published, genres } })
    console.log('add book...')
    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook