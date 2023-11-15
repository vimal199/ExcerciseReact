import { useDispatch } from "react-redux"
import { create_Anecdote } from '../reducers/anecdoteReducer'
import { sendNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create_Anecdote(content))
        dispatch(sendNotification(`you added ${content}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
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