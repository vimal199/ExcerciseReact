import { useDispatch } from "react-redux"
import { create_Anecdote, appendAnecdote, saveAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification, removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdotesService from "../services/anecdotes"
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // db hit
        //const created_anecdote = await anecdotesService.create(content)
        // dispatch(create_Anecdote(content))
        //dispatch(appendAnecdote(created_anecdote))
        dispatch(saveAnecdote(content))
        /*    dispatch(sendNotification(`you added ${content}`))
           setTimeout(() => {
               dispatch(removeNotification())
           }, 5000) */
        dispatch(setNotification(`you added ${content}`, 5000))
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </>
    )
}
export default AnecdoteForm