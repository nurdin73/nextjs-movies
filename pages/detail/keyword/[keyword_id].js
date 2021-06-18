import { Fragment, useState } from "react"
import Head from 'next/head'
import EachData from "../../../components/EachData"
import { pagination } from "../../../components/Pagination"
import Card from "../../../components/Card"
import slugify from "slugify"



function MovieByKeyword({ getDetail, getMovies }) {
    const [data, setData] = useState(null)

    const [totalResult, setTotalResult] = useState(data === null ? getMovies.total_results : data.total_results)
    const [pages, setPage] = useState(data === null ? getMovies.page : data.page)
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
        getData(`https://api.themoviedb.org/3/keyword/${getDetail.id}/movies?api_key=f52aa1a7c260685a467d566a4b94825f&page=${pageNumber}`)
    }
    return (
        <Fragment>
            <Head>
                <title>Movie list by keyword {getDetail.name}</title>
            </Head>
            <div className="mx-4 py-3 md:container md:mx-auto">
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-hidden">
                    {data !== null ? data.results.map((result, i) => {
                            return (
                                <Card imgWidth={400} imgHeight={580} result={result} key={i} type={result.media_type} link={`/detail/${result.media_type}/${result.id}-${slugify(result.title || result.name, {lower: true})}`} />
                            )
                        }) :
                        getMovies.results.map((result, i) => {
                            return (
                                <Card imgWidth={400} imgHeight={580} result={result} key={i} type={result.media_type} link={`/detail/${result.media_type}/${result.id}-${slugify(result.title || result.name, {lower: true})}`} />
                            )
                        })
                    }
                </ul>
                {/* <EachData data={getMovies} title={`Movie keyword ${getDetail.name}`} total="max" /> */}
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

export async function getServerSideProps(context) {
    const { keyword_id } = context.query
    const keywordId = keyword_id.split('-')[0]
    const getMovieUrl = await fetch(`https://api.themoviedb.org/3/keyword/${keywordId}/movies?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const getMovies = await getMovieUrl.json()

    const getDetailUrl = await fetch(`https://api.themoviedb.org/3/keyword/${keywordId}?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const getDetail = await getDetailUrl.json()

    return {
        props: {
            getMovies,
            getDetail
        }
    }
}

export default MovieByKeyword