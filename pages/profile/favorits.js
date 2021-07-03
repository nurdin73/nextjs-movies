import { Fragment, useEffect } from "react"
import Head from 'next/head'
import {useRouter} from 'next/router'
import Cookies from "js-cookie"
function Favorits() {  

    const router = useRouter()
    useEffect(() => {
        const sessionId = Cookies.get('session_id')
        if(!sessionId) {
            router.push('/')
        }
    })

    return (
        <Fragment>
            <h1>Favorits</h1>
            <pre>{Cookies.get('account')}</pre>
        </Fragment>
    )
}

export default Favorits