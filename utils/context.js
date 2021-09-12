import { createContext, useReducer, useState } from "react"


export const ContextProvider = createContext({})

const initialState = {

}

const reducer = (state, { type, payload }) => {
    
}


function Context({children}) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const [toggleNav, setToggleNav] = useState(true)

    const [userIsLoading, setUserIsLoading] = useState(true)
    

    const [databaseMatchError, setDatabaseMatchError] = useState("")
    const [usingGoogleSignIn, setUsingGoogleSignIn] = useState(false)



    return (
        <ContextProvider.Provider value={{state, dispatch, toggleNav, setToggleNav, databaseMatchError, setDatabaseMatchError, usingGoogleSignIn, setUsingGoogleSignIn}} >
            {children}
        </ContextProvider.Provider>
    )
}

export default Context
