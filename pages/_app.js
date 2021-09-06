import Sidenav from '../components/sidenav'
import Header from '../components/Header'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'

initAuth()

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return <Component {...pageProps} />
  }

  return (
    <div className="flex flex-grow-0">
      <Sidenav />
      <div className='relative w-full p-3'>
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
    )
}

export default MyApp
