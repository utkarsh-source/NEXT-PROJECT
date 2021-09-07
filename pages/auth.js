import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'


const Auth = () => (
  <div className="p-10 absolute top-1/2 shadow-md left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl ">
    <h3 className="text-2xl font-semibold pb-3">Sign in</h3>
    <div>
      <FirebaseAuth />
    </div>
  </div>
)

Auth.getLayout = true;

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)
