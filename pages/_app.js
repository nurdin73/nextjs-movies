import { Fragment } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Navbar />
      <div className="min-h-screen bg-gray-900 bg-opacity-95 py-3">
        <Component {...pageProps} />
      </div>
      <Footer />
    </Fragment>  
  )
}

export default MyApp
