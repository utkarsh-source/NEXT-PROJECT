import Sidenav from '../components/sidenav'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-grow-0">
      <Sidenav/>
      <Component {...pageProps} />
    </div>
    )
}

export default MyApp
