import { useDispatch } from "react-redux"
import { create_Anecdote } from '../reducers/anecdoteReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create_Anecdote(content))
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