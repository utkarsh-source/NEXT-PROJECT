import React, { useContext } from 'react'
import { HiMenuAlt2 as Menu} from  'react-icons/hi'
import { ContextProvider } from '../utils/context'




const Header = ({signOut, email}) => {

  const {toggleNav,  setToggleNav } = useContext(ContextProvider)

  return (
    <div className="mb-3 w-full border border-gray-300 flex items-center rounded-md py-3 px-5">
      <Menu onClick={()=>setToggleNav(!toggleNav)} className="text-cyan text-5xl border border-gray-300 rounded-md mr-6"/>
      <p className="hidden lg:inline-block">Signed in as <span className="px-1 underline text-base font-semibold ">{email}</span></p>
          <button className="plain-btn flex items-center ml-auto"
            type="button"
            onClick={() => {
              signOut()
            }}
          >
            Sign out
          </button>
      </div>
  )
}
export default Header
