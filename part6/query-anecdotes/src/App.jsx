import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReducer } from 'react'
import AnecdoteContext from './AnecdoteContext'
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'sendNotification':
      return action.payload
      break;
    case 'removeNotification':
      return ''
    default:
      break;
  }
}
const App = () => {
  const queryClient = useQueryClient()
  const [notif, notifDispatch] = useReducer(notificationReducer, '')
  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
      retry: 1
    }
  )
  const updateVotes = async (anecdote) => {
    const created_anecdote = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
  }

  const updateAnecMutation = useMutation(
    {
      mutationFn: updateVotes,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      },
    }
  )
  if (result.isPending) {
    return (
      <div>
        Loading.......
      </div>
    )
  }
  if (result.isError) {
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
  }


  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecMutation.mutate({ ...anecdote, votes: ++anecdote.votes })
    notifDispatch({ type: 'sendNotification', payload: `You voted ${anecdote.content}` })
    setTimeout(() => {
      notifDispatch({ type: 'removeNotification' })
    }, 5000);
  }

  const anecdotes = result.data /* [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ] */

  return (
    <div>
      <AnecdoteContext.Provider value={[notif, notifDispatch]}>
        <h3>Anecdote app</h3>

        <Notification /* notif={notif} */ />
        <AnecdoteForm />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </AnecdoteContext.Provider>
    </div>
  )
}

export default App
