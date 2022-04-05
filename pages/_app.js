import Head from 'next/head'
import { Fragment, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="VSB6duLCNGdsrn06AdbowsElEaSqAJ1-E-FQr5ZEr7E" />
      </Head>
      <NextNprogress
        color="rgba(245, 158, 11, 1);"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{
          showSpinner: false
        }}
      />
      <Navbar />
      <div className="min-h-screen bg-gray-900 md:bg-opacity-95">
        <Component {...pageProps} />
      </div>
      <Footer />
    </Fragment>  
  )
}

export default MyApp
