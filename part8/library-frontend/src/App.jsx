import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import RecomGenre from './components/RecomGenre'
import React from 'react';
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  console.log(token);
  const handleLogout = () => {
    localStorage.removeItem("library-user-token")
    setToken('')
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        {token != "" ? <button onClick={handleLogout}>Logout</button> : <button onClick={() => setPage('login')}>Login</button>}
        <button onClick={() => setPage('RecomGenre')}>recommend</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      <Login show={page === 'login' && token == ""} setToken={setToken} />
      <RecomGenre show={page === 'RecomGenre'} />
    </div>
  )
}

export default App
