import { createContext, useReducer, useState } from "react"


export const ContextProvider = createContext({})

const initialState = {

}

const reducer = (state, { type, payload }) => {
    
}

function Context({children}) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const [toggleNav, setToggleNav] = useState(false)
    


    return (
        <ContextProvider.Provider value={{state, dispatch, toggleNav, setToggleNav}} >
            {children}
        </ContextProvider.Provider>
    )
}

export default Context
