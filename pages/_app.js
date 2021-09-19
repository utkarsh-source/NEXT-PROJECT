import initAuth from '../utils/initAuth'
import Context from '../utils/context'
import '../styles/globals.css'


initAuth()

function MyApp({ Component, pageProps }) {
      
  return (
    <Context>
        <Component {...pageProps} />
    </Context>
    )
}

export default MyApp

