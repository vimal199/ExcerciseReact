import { useSelector, useDispatch } from 'react-redux'
import { updateVote, create_Anecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import anecdotesService from './services/anecdotes'
import { setNotes } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(
    () => {
      anecdotesService.getAll().then(
        (anecdotes) => {
          dispatch(setNotes(anecdotes))
        }
      )
    }, []
  )
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App