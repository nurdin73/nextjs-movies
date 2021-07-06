import { Fragment, useEffect, useState } from "react"
import Head from 'next/head'
import {useRouter} from 'next/router'
import Cookies from "js-cookie"
import Card from '../../components/Card'
import slugify from "slugify"
function Watchlists() {  

    const router = useRouter()
    const [data, setData] = useState(null)
    const [tab, setTab] = useState('movies')
    const [aliasTab, setAliasTab] = useState('movie')
    const [account, setAccount] = useState(null)
    const [session, setSession] = useState(null)

    useEffect(() => {
        const sessionId = Cookies.get('session_id')
        setSession(sessionId)
        if(!sessionId) {
            router.push('/')
        }
        const myAccount = JSON.parse(Cookies.get('account'))
        setAccount(myAccount)
        async function getFav() {  
            const req = await fetch(`https://api.themoviedb.org/3/account/${myAccount.id}/watchlist/movies?api_key=${process.env.API_KEY}&session_id=${sessionId}&sort_by=created_at.desc`)
            const res = await req.json()
            setData(res)
        }
        getFav()
    }, [setData])

    const handleTabShow = (nameTab = "") => async () => {
        setTab(nameTab)
        if(nameTab === "movies") {
            setAliasTab('movie')
        } else {
            setAliasTab('tv')
        }
        const req = await fetch(`https://api.themoviedb.org/3/account/${account.id}/watchlist/${nameTab}?api_key=${process.env.API_KEY}&session_id=${session}&sort_by=created_at.desc`)
        const res = await req.json()
        setData(res)
    }

    return (
        <Fragment>
            <Head>
                <title>My Watchlists</title>
            </Head>
            <div className="md:container md:mx-auto px-3">
                <h1 className="text-2xl text-yellow-500 uppercase md:py-3 py-1 border-b-2 border-gray-700 md:mb-3 mb-1">Watchlists</h1>
                <ul className="flex space-x-2 whitespace-nowrap mb-3">
                    <li onClick={handleTabShow('movies')} className={`${tab === "movies" ? "bg-yellow-500 text-gray-900" : "md:bg-gray-900 bg-gray-800"} px-3 cursor-pointer hover:bg-yellow-500 hover:text-gray-900 transition duration-300 py-1 text-md text-gray-500 rounded`}>Movies</li>
                    <li onClick={handleTabShow('tv')} className={`${tab === "tv" ? "bg-yellow-500 text-gray-900" : "md:bg-gray-900 bg-gray-800"} px-3 cursor-pointer hover:bg-yellow-500 hover:text-gray-900 transition duration-300 py-1 text-md text-gray-500 rounded`}>Tv Show</li>
                </ul>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto md:overflow-hidden">
                    {data !== null ? 
                        (
                            data.results.length > 0 ? data.results.map((result, key) => {
                                return <Card key={key} result={result} type={aliasTab} imgWidth={400} imgHeight={580} link={`/detail/${aliasTab}/${result.id}-${slugify(result.title || result.name, {lower: true})}`} />
                            }) : <h1 className="uppercase text-xl col-span-8 text-yellow-500">Object not found</h1>
                        )
                    : ""
                    }
                </ul>
            </div>
        </Fragment>
    )
}

export default Watchlists