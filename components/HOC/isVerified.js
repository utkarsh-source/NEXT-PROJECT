import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import FullPageLoader from "../FullPageLoader"
import { useState, useEffect, useContext} from 'react'
import {USER_BY_EMAIL_ID} from '../../utils/gqlQuery'
import {client} from '../../utils/apolloClient'
import { ContextProvider } from "../../utils/context"


function Verify({ children }) {
    
    const {setDatabaseMatchError, usingGoogleSignIn} = useContext(ContextProvider)
    
    const [isLoading, setIsloding] = useState(false)
        
    const AuthUser = useAuthUser()

    useEffect(() => {
        if (AuthUser.email && usingGoogleSignIn) {
            setIsloding(true)
            client.query({
                query: USER_BY_EMAIL_ID,
                variables: {
                    email: AuthUser.email
                }
            }).then(({ data }) => {
                console.log(data);
                if (!data.current_user_by_pk) {
                    setDatabaseMatchError("Provided user email does not match any user in out database!")
                    AuthUser.signOut();
                }
                setIsloding(false);
            }).catch(err => {
                console.log(err);
                setIsloding(false);
            })
    
        }
    }, [])
    
    return isLoading ?  <FullPageLoader />  : <>{children}</>
}



export default withAuthUser({
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    LoaderComponent: FullPageLoader,
})(Verify)