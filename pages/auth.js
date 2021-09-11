import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'
import Login from '../components/Login'
import FullPageLoader from '../components/FullPageLoader'


const Auth = () => {

  return (
    <Login/>  
  )
}

Auth.getLayout = true;

export default withAuthUser({
  whenAuthed : AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_APP,
  appPageURL : "/dashboard",
  LoaderComponent: FullPageLoader
})(Auth)
