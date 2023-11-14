const reducer = (state = null, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.payload
            break;
        default:
            return state
    }
}
export const filterAnecdote = (input_data) => {
    return (
        {
            type: 'FILTER',
            payload: { input_data }
        }
    )
}
export default reducer