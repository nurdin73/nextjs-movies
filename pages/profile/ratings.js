import { Fragment } from "react"
import Head from 'next/head'
function Ratings() {  
    return (
        <Fragment>
            <Head>
                <title>My Ratings</title>
            </Head>
            <ul className="flex items-center space-x-2 whitespace-nowrap">
                <li>TV</li>
                <li>TV Episodes</li>
                <li>Movies</li>
            </ul>
        </Fragment>
    )
}

export default Ratings