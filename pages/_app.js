import Sidenav from '../components/sidenav'
import Header from '../components/Header'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'


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
