const QuotesReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_QUOTES":
            return {
                quotes: action.payload
            }

        case "ADD_QUOTE":
            return {
                quotes: [...state.quotes, action.payload]
            }

        case "UPDATE_QUOTE":
            return {
                quotes: state.quotes.map(quote => quote._id === action.payload._id ?
                    action.payload : quote)
            }

        case "UPDATE_TOTAL":
            return {
                quotes: state.quotes.map(quote => quote._id === action.payload.id ?
                    {...quote, total: action.payload.total} : quote)
            }

        case "DELETE_QUOTE":
            return {
                quotes: state.quotes.filter(quote => quote._id !== action.payload)
            }

            default:
            return state
    }
}

export default QuotesReducer