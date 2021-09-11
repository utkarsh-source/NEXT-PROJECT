import React from 'react'
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import Login from '../components/Login'


const Auth = () => {

  return (
    <Login/>  
  )
}


export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

Auth.getLayout = true;

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth)
