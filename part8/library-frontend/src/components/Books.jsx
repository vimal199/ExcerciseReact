import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ALLBOOKS } from '../queries';
import { useState } from 'react';
const Books = (props) => {
  if (!props.show) {
    return null
  }
  const [displayedbooks, setDisplayedbooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALLBOOKS)
  if (result.loading) {
    return (
      <div>loading....</div>
    )
  }
  console.log('displayedbooks.size ', displayedbooks.size);
  let books = result.data.allBooks;
  if (displayedbooks.length == 0) {
    setDisplayedbooks(books)
  }
  let temp = []
  let genres = books.forEach(
    (book) => {
      console.log('book', book);
      let x = book.genres.filter((genre) => {
        console.log(genre);
        return !temp.includes(genre)
      })
      temp = temp.concat(x)
    }
  )
  console.log('temp', temp);
  let booksWithGenre = []
  const handleGenres = (event) => {
    setSelectedGenre(event.target.value)
    let booksByGenre = books.filter(
      (book) => {
        const genres = book.genres.filter(
          (genre) => {
            console.log(event.target.value);

            return genre == event.target.value;
          }
        )
        console.log('genres', genres);
        if (genres.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    )
    console.log('book with genre ', booksByGenre);
    setDisplayedbooks(booksByGenre);
  }
  return (

    <div>
      <h2>books</h2>
      <p>in genre {selectedGenre == '' ? 'All' : selectedGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {displayedbooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {temp.map(
        (genre) => {
          return <button onClick={handleGenres} value={genre}>{genre}</button>
        }
      )
      }
    </div>
  )
}

export default Books
