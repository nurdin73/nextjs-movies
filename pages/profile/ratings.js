import { Fragment, useEffect, useState } from "react"
import Head from 'next/head'
import {useRouter} from 'next/router'
import Cookies from "js-cookie"
import Image from "next/image"
import slugify from "slugify"
import DateStr from "../../components/DateStr"
import Link from "next/link"
import { pagination } from "../../components/Pagination"
function Ratings() { 
    const router = useRouter()
    const [data, setData] = useState(null)
    const [tab, setTab] = useState('movies')
    const [aliasTab, setAliasTab] = useState('movie')
    const [account, setAccount] = useState(null)
    const [session, setSession] = useState(null)

    // paginate
    const [totalResult, setTotalResult] = useState(null)
    const [pages, setPage] = useState(null)
    const [paginate, setPaginate] = useState(null)
    const [prevDisabled, setPrevDisabled] = useState(null)
    const [nextDisabled, setNextDisabled] = useState(null)

    useEffect(() => {
        const sessionId = Cookies.get('session_id')
        setSession(sessionId)
        if(!sessionId) {
            router.push('/')
        }
        const myAccount = JSON.parse(Cookies.get('account'))
        setAccount(myAccount)
        async function getFav() {  
            const req = await fetch(`https://api.themoviedb.org/3/account/${myAccount.id}/rated/movies?api_key=${process.env.API_KEY}&session_id=${sessionId}&sort_by=created_at.desc`)
            const res = await req.json()
            setData(res)
            setTotalResult(res.total_results)
            setPage(res.page)
            const paginations = pagination(res.total_results, res.page)
            setPaginate(paginations)
            setPrevDisabled(paginations.currentPage === 1 ? true : false)
            setNextDisabled(paginations.currentPage === paginations.totalPages ? true : false)
        }
        getFav()
    }, [setData])

    const handlePaginate = (pageNumber = 1) => () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        async function getData(url = "") {
            const res = await fetch(url)
            const resp = await res.json()
            setData(resp)
            setPage(resp.page)
            setTotalResult(resp.total_results)
            const paginations = pagination(resp.total_results, resp.page)
            setPaginate(paginations)
            setPrevDisabled(paginations.currentPage === 1 ? true : false)
            setNextDisabled(paginations.currentPage === paginations.totalPages ? true : false)
        }
        getData(`https://api.themoviedb.org/3/account/${account.id}/rated/${tab}?api_key=${process.env.API_KEY}&session_id=${session}&sort_by=created_at.desc&page=${pageNumber}`)
    }

    const handleTabShow = (nameTab = "") => async () => {
        setTab(nameTab)
        if(nameTab === "movies") {
            setAliasTab('movie')
        } else {
            setAliasTab('tv')
        }
        const req = await fetch(`https://api.themoviedb.org/3/account/${account.id}/rated/${nameTab}?api_key=${process.env.API_KEY}&session_id=${session}&sort_by=created_at.desc`)
        const res = await req.json()
        setData(res)
        setTotalResult(res.total_results)
        setPage(res.page)
        const paginations = pagination(res.total_results, res.page)
        setPaginate(paginations)
        setPrevDisabled(paginations.currentPage === 1 ? true : false)
        setNextDisabled(paginations.currentPage === paginations.totalPages ? true : false)
    }
    return (
        <Fragment>
            <Head>
                <title>My Ratings</title>
            </Head>
            <div className="md:container md:mx-auto px-3">
                <h1 className="text-2xl text-yellow-500 uppercase md:py-3 py-1 border-b-2 border-gray-700 md:mb-3 mb-1">Ratings</h1>
                <ul className="flex space-x-2 whitespace-nowrap mb-3 mt-3">
                    <li onClick={handleTabShow('movies')} className={`${tab === "movies" ? "bg-yellow-500 text-gray-900" : "md:bg-gray-900 bg-gray-800"} px-3 cursor-pointer hover:bg-yellow-500 hover:text-gray-900 transition duration-300 py-1 text-md text-gray-500 rounded`}>Movies</li>
                    <li onClick={handleTabShow('tv')} className={`${tab === "tv" ? "bg-yellow-500 text-gray-900" : "md:bg-gray-900 bg-gray-800"} px-3 cursor-pointer hover:bg-yellow-500 hover:text-gray-900 transition duration-300 py-1 text-md text-gray-500 rounded`}>Tv Show</li>
                </ul>
                <ul className="grid grid-cols-1 gap-4">
                    {data !== null ? 
                        (
                            data.results.length > 0 ? data.results.map((result, key) => {
                                return <List key={key} result={result} type={aliasTab} link={`/detail/${aliasTab}/${result.id}-${slugify(result.title || result.name, {lower: true})}`} />
                            }) : <h1 className="uppercase text-xl col-span-8 text-yellow-500">Object not found</h1>
                        )
                    : <h1 className="uppercase text-xl col-span-8 text-yellow-500">Object not found</h1>
                    }
                </ul>
                <div className="flex justify-center mt-4">
                    <ul className="flex justify-start items-center rounded overflow-hidden">
                        <li key="prev">
                            <button onClick={handlePaginate(pages > 1 ? pages - 1  :pages)} disabled={prevDisabled} className={`${prevDisabled === true ? 'opacity-50 cursor-not-allowed' : ""} md:px-3 md:py-1 px-1.5 py-1 md:text-lg text-sm hover:bg-gray-600 cursor-pointer bg-gray-700 text-gray-300`}>Prev</button>
                        </li>
                        {pages > 490 ? 
                            <li key="...">
                                <button disabled className="opacity-50 focus:outline-none cursor-not-allowed md:px-3 md:py-1 px-1.5 py-1 md:text-lg text-sm hover:bg-gray-600 bg-gray-700 text-gray-300">...</button>
                            </li>
                            : ""
                        } 
                        {paginate?.pages.map((page, key) => {
                            const active = pages === page ? "bg-gray-900 hover:bg-opacity-70" : "bg-gray-700 hover:bg-gray-600"
                            return (
                                <li key={key}>
                                    <button onClick={handlePaginate(page)} className={`md:px-3 md:py-1 px-1.5 py-1 md:text-lg text-sm ${active} cursor-pointer focus:outline-none text-gray-300`}>{page}</button>
                                </li>
                            )
                        })}
                        {pages < 490 ? 
                            <li key="...">
                                <button disabled className="opacity-50 cursor-not-allowed md:px-3 md:py-1 px-1.5 py-1 md:text-lg text-sm hover:bg-gray-600 focus:outline-none bg-gray-700 text-gray-300">...</button>
                            </li>
                            : ""
                        } 
                        <li key="next">
                            <button  onClick={handlePaginate(pages !== paginate?.totalPages ? pages + 1  :pages)} disabled={nextDisabled} className={`${nextDisabled === true ? 'opacity-50 cursor-not-allowed' : ""} md:px-3 md:py-1 px-1.5 py-1 md:text-lg text-sm focus:outline-none hover:bg-gray-600 cursor-pointer bg-gray-700 text-gray-300`}>Next</button>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

function List({ result, type, link }) {

    return (
        <Fragment>
            <div className="md:grid md:grid-cols-12 gap-3 hidden group">
                <div className="col-span-2 relative">
                    <Image 
                        src={`https://image.tmdb.org/t/p/original${result.still_path || result.poster_path || result.profile_path}`}
                        alt={result.name || result.original_name || result.title || result.original_title}
                        width={400}
                        height={550}
                        className="rounded"
                        loading="lazy"
                    />
                </div>
                <div className="col-span-10">
                    <div className="flex justify-start items-center space-x-2">
                        <span className="bg-gray-900 text-yellow-500 flex justify-center items-center rounded-full border border-yellow-500 w-10 h-10">{result.vote_average}</span>
                        <div className="flex flex-col">
                            <Link href={link}>
                                <span className="md:text-xl md:text-yellow-500 md:font-semibold hover:underline cursor-pointer">{result.name || result.title}</span>
                            </Link>
                            <span className="md:text-xs md:text-gray-500"><DateStr date={result.release_date || result.first_air_date} /></span>
                        </div>
                    </div>
                    <p className="md:text-lg md:text-gray-500">{result.overview}</p>
                    <div className="flex justify-start space-x-5 mt-2">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-bold">Popularity</span>
                            <span className="text-sm text-gray-500 italic">{result.popularity}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-bold">Vote Count</span>
                            <span className="text-sm text-gray-500 italic">{result.vote_count}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-bold">Your Rating</span>
                            <span className="text-sm text-gray-500 italic">{result.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow rounded overflow-hidden md:hidden block mb-2">
                <Image 
                    src={`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${result.backdrop_path}`}
                    width={1920}
                    height={800}
                    alt={result.name || result.title}
                    className="rounded"
                    loading="lazy"
                />
                <div className='p-2 flex flex-col'>
                    <div className="flex justify-start items-center space-x-2">
                        <span className="bg-gray-900 text-yellow-500 flex justify-center items-center rounded-full border border-yellow-500 w-7 h-7">{result.vote_average}</span>
                        <div className="flex flex-col">
                            <Link href={link}>
                                <span className="text-sm text-yellow-500 font-semibold">{result.name || result.title}</span>
                            </Link>
                            <span className="text-xs text-gray-500"><DateStr date={result.release_date || result.first_air_date} /></span>
                        </div>
                    </div>
                    <span className="text-gray-500 font-bold">Overview</span>
                    <p className="text-sm text-justify text-gray-500">{result.overview}</p>
                    <div className="flex justify-between space-x-3 mt-2">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-bold">Popularity</span>
                            <span className="text-sm text-gray-500 italic">{result.popularity}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-bold">Vote Count</span>
                            <span className="text-sm text-gray-500 italic">{result.vote_count}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-bold">Your Rating</span>
                            <span className="text-sm text-gray-500 italic text-right">{result.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Ratings