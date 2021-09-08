import React, { useContext } from 'react'
import Link from 'next/link'
import {IoMdLogIn} from 'react-icons/io' 
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { HiMenuAlt2 as Menu} from  'react-icons/hi'
import { ContextProvider } from '../utils/context'



const Header = () => {

  const {toggleNav,  setToggleNav } = useContext(ContextProvider)

  const AuthUser = useAuthUser()

  return (

    <div className="mb-3 w-full border border-gray-300 flex items-center rounded-md py-3 px-5">
      <Menu onClick={()=>setToggleNav(!toggleNav)} className="md:hidden inline-block text-cyan text-5xl border rounded-md mr-6"/>
      {AuthUser.email ? (
        <>
          <p className="hidden lg:block">Signed in as <span className="px-1 underline text-base font-semibold ">{AuthUser.email}</span></p>
          <button className="plain-btn flex items-center ml-auto"
            type="button"
            onClick={() => {
              AuthUser.signOut()
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <p className="text-base font-semibold text-gray-900">You are not signed in</p>
          <Link href="/auth">
            <a className="ml-auto">
              <button className='plain-btn flex items-center' type="button">
                <IoMdLogIn className='text-xl mr-2 text-gray-900' /> Sign in
              </button>
            </a>
          </Link>
        </>
      )}
    </div>
  )
}
export default withAuthUser()(Header)
