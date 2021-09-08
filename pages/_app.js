import Sidenav from '../components/sidenav'
import Header from '../components/Header'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'
import Context, { ContextProvider } from '../utils/context'
import { useContext } from 'react'


initAuth()

function MyApp({ Component, pageProps }) {

  const { toggleNav } = useContext(ContextProvider)
  

  if (Component.getLayout) {
    return <Context> <Component {...pageProps} /></Context>
  }

  return (
    <Context>
      <div className="overflow-x-hidden w-screen flex flex-grow-0">
        <Sidenav />
        <div className={`${toggleNav && "ml-64"} relative w-full md:min-w-min min-w-full p-3 border-2`}>
          <Header />
          <Component {...pageProps} />
        </div>
      </div>
    </Context>
    )
}

export default MyApp
