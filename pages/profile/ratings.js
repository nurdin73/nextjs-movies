import { Fragment, useEffect } from "react"
import Head from 'next/head'
import {useRouter} from 'next/router'
import Cookies from "js-cookie"
function Ratings() {  
    const router = useRouter()
    useEffect(() => {
        const sessionId = Cookies.get('session_id')
        if(!sessionId) {
            router.push('/')
        }
    })

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