import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useContext } from 'react'
import { ContextProvider } from '../utils/context'
import FullPageLoader from './FullPageLoader'
import Header from './Header'
import Sidenav from './sidenav'

function Layout({ children }) {

    const { toggleNav } = useContext(ContextProvider)
    const AuthUser = useAuthUser()

    return (
        <div className="overflow-x-hidden w-screen flex flex-grow-0">
            <Sidenav />
            <div className={`${toggleNav ? 'ml-64' : "ml-0"} transition-m relative w-full md:min-w-min min-w-full p-3`}>
                <Header signOut={AuthUser.signOut} email={AuthUser.email}/>
                {children}
            </div >
      </div> 
        
    )
}

export default withAuthUser({
    whenUnauthedBeforeInit : AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    LoaderComponent : FullPageLoader
})(Layout)
