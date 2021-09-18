import React, { useContext } from 'react'
import {useAuthUser, withAuthUser } from 'next-firebase-auth'
import { HiMenuAlt2 as Menu} from  'react-icons/hi'
import { ContextProvider } from '../utils/context'




const Header = () => {

  const {toggleNav,  setToggleNav } = useContext(ContextProvider)

  const AuthUser = useAuthUser()

  console.log(AuthUser)

  return (
    <div className="mb-3 w-full border border-gray-300 flex items-center rounded-md py-3 px-5">
      <Menu onClick={()=>setToggleNav(!toggleNav)} className="text-cyan text-5xl border border-gray-300 rounded-md mr-6"/>
      {AuthUser.firebaseUser && <p className="hidden lg:inline-block">Signed in as <span className="px-1 underline text-base font-semibold ">{AuthUser.email}</span></p>}
          <button className="plain-btn flex items-center ml-auto"
            type="button"
            onClick={() => {
              AuthUser.signOut()
            }}
          >
            Sign out
          </button>
      </div>
  )
}
export default withAuthUser()(Header)
