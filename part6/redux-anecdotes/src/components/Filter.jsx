import { useDispatch } from "react-redux"
import { filterAnecdote } from "../reducers/filterReducer"
const Filter = () => {
    const dispatch = useDispatch()
    const style = {
        marginBottom: 10
    }
    const handleChange = (event) => {
        console.log(event);
        dispatch(filterAnecdote(event.target.value))
    }
    return (
        <div style={style}>
            Filter <input name='anecdote' onChange={handleChange} />
        </div>
    )
}
export default Filter