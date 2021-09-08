import Sidenav from '../components/sidenav'
import Header from '../components/Header'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'
import Context, { ContextProvider } from '../utils/context'
import { useContext } from 'react'


initAuth()

function MyApp({ Component, pageProps }) {

  

  
  
  if (Component.getLayout) {
    return <Context> <Component {...pageProps} /></Context>
  }
  
  const HeaderWrapper = () => {
    const { toggleNav } = useContext(ContextProvider)
    return (
      <div className={`${toggleNav ? 'ml-64' : "ml-0"} transition-m relative w-full md:min-w-min min-w-full p-3`}>
          <Header />
          <Component {...pageProps} />
      </div>
    )
  }

  return (
    <Context>
      <div className="overflow-x-hidden w-screen flex flex-grow-0">
        <Sidenav />
        <HeaderWrapper/>
      </div>
    </Context>
    )
}

export default MyApp
