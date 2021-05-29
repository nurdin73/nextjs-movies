import Head from 'next/head'
import { Fragment, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <div className="min-h-screen bg-gray-900 md:bg-opacity-95">
        <Component {...pageProps} />
      </div>
      <Footer />
    </Fragment>  
  )
}

export default MyApp
