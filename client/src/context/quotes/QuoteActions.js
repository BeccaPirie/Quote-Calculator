export const FetchQuotes = (quotes) => ({
    type: "FETCH_QUOTES",
    payload: quotes
})

export const AddQuote = (quote) => ({
    type: "ADD_QUOTE",
    payload: quote
})

export const UpdateQuote = (quote) => ({
    type: "UPDATE_QUOTE",
    payload: quote
})

export const UpdateTotal = (quote) => ({
    type: "UPDATE_TOTAL",
    payload: quote
})

export const DeleteQuote = (id) => ({
    type: "DELETE_QUOTE",
    payload: id
})