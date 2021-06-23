import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from 'next/router'
import { Fragment, useState } from "react"
import slugify from "slugify"
import DateStr from "../../components/DateStr"
import { pagination } from "../../components/Pagination"
import Card from '../../components/Card'


function ListTv({ response }) {

    const router = useRouter()
    const { media, list } = router.query
    const [data, setData] = useState(null)

    const [totalResult, setTotalResult] = useState(data === null ? response.total_results : data.total_results)
    const [pages, setPage] = useState(data === null ? response.page : data.page)
    const [paginate, setPaginate] = useState(pagination(totalResult, pages))
    const [prevDisabled, setPrevDisabled] = useState(paginate.currentPage === 1 ? true : false)
    const [nextDisabled, setNextDisabled] = useState(paginate.currentPage === paginate.totalPages ? true : false)


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
        getData(`https://api.themoviedb.org/3/${media}/${list}?api_key=${process.env.API_KEY}&page=${pageNumber}`)
    }
    return (
        <Fragment>
            <Head>
                <title>{list} {media} | LUX movie tv rating</title>
            </Head>
            <div className="mx-3 xl:container xl:mx-auto pt-2 pb-3">
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-hidden">
                    {data !== null ? data.results.map((result, key) => {
                        return (
                            <Card result={result} imgWidth={400} imgHeight={580} link={`/detail/${media}/${result.id}-${slugify(result.title || result.name, {lower: true})}`} key={key} type={media} />
                        )
                    }) :
                    response.results.map((result, key) => {
                        return (
                            <Card result={result} imgWidth={400} imgHeight={580} link={`/detail/${media}/${result.id}-${slugify(result.title || result.name, {lower: true})}`} key={key} type={media} />
                        )
                    })
                    }
                </ul>
                <div className="flex justify-center mt-4 mb-1">
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
                        {paginate.pages.map((page, key) => {
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
                            <button  onClick={handlePaginate(pages !== paginate.totalPages ? pages + 1  :pages)} disabled={nextDisabled} className={`${nextDisabled === true ? 'opacity-50 cursor-not-allowed' : ""} md:px-3 md:py-1 px-1.5 py-1 md:text-lg text-sm focus:outline-none hover:bg-gray-600 cursor-pointer bg-gray-700 text-gray-300`}>Next</button>
                        </li>
                    </ul>
                </div>
                
            </div>
        </Fragment>
    )
}


function List({ result, media_type }) {
    var rating = media_type === "person" ? result.popularity.toFixed(1) : result.vote_average
    return (
        <Link href={`/detail/${media_type}/${result.id}-${slugify(result.title || result.name, {
            lower: true
        })}`}>
            <li className="cursor-pointer shadow-sm">
                <div className="relative overflow-hidden group rounded">
                    <Image 
                        src={`https://image.tmdb.org/t/p/w500${result.poster_path || result.profile_path}`}
                        alt={ result.title || result.name }
                        width={400}
                        height={580}
                        loading="lazy"
                    />
                    <span className="block truncate px-1 absolute right-0 rounded-bl-lg border-gray-500 shadow-md rounded-tr-sm text-sm top-0 w-10 text-center font-bold py-0.5 lg:bg-gray-900 bg-gray-800 text-gray-400">{rating}</span>
                    <div className="absolute left-0 right-0 -bottom-0 px-1 py-1 lg:bg-gray-900 bg-gray-800 text-white">
                        <span className="truncate text-sm block -mb-2 text-white group-hover:underline">{result.title || result.original_title || result.name || result.original_name}</span>
                        <span style={{ fontSize: '.6rem' }} className="text-gray-500 italic leading-3">{media_type === "person" ? result.known_for_department : <DateStr date={result.release_date || result.first_air_date} />}</span>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export async function getServerSideProps(context) {
    const { media, list } = context.query
    const baseUrl = "https://api.themoviedb.org/3/"
    const res = await fetch(`${baseUrl}${media}/${list}?api_key=${process.env.API_KEY}`)
    const response = await res.json()
    return {
        props: {
            response
        }
    }
}

export default ListTv