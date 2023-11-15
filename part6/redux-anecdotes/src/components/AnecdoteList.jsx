import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"
import { sendNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(
        (state) => {
            console.log('state is ', state);
            let filtered_anecdootes = state.filter != null ? state.anecdotes.filter(
                (in_data) => {
                    console.log('in_data.content ', in_data.content);
                    console.log('state.filter ', state.filter);
                    if (in_data.content.includes(state.filter)) {
                        return true
                    } else {
                        return false
                    }
                }
            ) : state.anecdotes
            console.log('filtered_anecdootes ', filtered_anecdootes)
            return [...filtered_anecdootes].sort(
                (a, b) => {
                    if (a.votes < b.votes) {
                        return -1
                    }
                    if (a.votes > b.votes) {
                        return 1
                    }
                    if (a.votes == b.votes) {
                        return 0
                    }
                }
            )
        })
    const dispatch = useDispatch()
    const vote = (anecdote) => {
        console.log('vote', anecdote)
        dispatch(updateVote(anecdote.id))
        /*   dispatch(
            {
              type: 'UPDATE_VOTE',
              payload: {
                id
              }
            }
          ) */
        dispatch(sendNotification(`you voted ${anecdote.content}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    }
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default AnecdoteList