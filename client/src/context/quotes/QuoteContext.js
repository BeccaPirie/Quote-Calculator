import { createContext, useReducer, useEffect } from 'react'
import QuoteReducer from './QuoteReducer'

const INITIAL_STATE = {
    quotes: []
}

export const QuoteContext = createContext(INITIAL_STATE)

export const QuoteContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(QuoteReducer, INITIAL_STATE)

    return(
        <QuoteContext.Provider
            value={{
                quotes:state.quotes,
                dispatch
            }}>
                {children}
        </QuoteContext.Provider>
    )
}