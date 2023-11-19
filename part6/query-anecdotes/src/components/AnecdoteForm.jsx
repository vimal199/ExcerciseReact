import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import AnecdoteContext from "../AnecdoteContext"
const AnecdoteForm = () => {
  const [notif, notifDispatch] = useContext(AnecdoteContext)
  const queryClient = useQueryClient()
  const createAnecdote = async (anecdote) => {
    /* try {
      const created_anecdote = await axios.post('http://localhost:3001/anecdotes', anecdote)
    } catch (e) {
      console.log('error when saving ', e.response.data)
    } */
    const created_anecdote = await axios.post('http://localhost:3001/anecdotes', anecdote)
  }
  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (err) => {
      const err_msg = err.response.data.error
      console.log(err_msg)
      notifDispatch({ type: 'sendNotification', payload: err_msg })
      setTimeout(() => {
        notifDispatch({ type: 'removeNotification' })
      }, 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecMutation.mutate({ content, votes: 0 })
    if (newAnecMutation.isSuccess) {
      console.log('2222222222222222');
      notifDispatch({ type: 'sendNotification', payload: `You added ${content}` })
      setTimeout(() => {
        notifDispatch({ type: 'removeNotification' })
      }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
