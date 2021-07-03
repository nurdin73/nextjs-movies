import Head from "next/head";
import { useRouter } from "next/router";
import { forwardRef, Fragment, useState } from "react";
import slugify from "slugify";
import Card from "../../components/Card";
import { pagination } from "../../components/Pagination";
import FlipMove from "react-flip-move";
import Genre from "../../components/Genre";

function GenreDetail({movieByGenre, genres}) {
    const router = useRouter()
    const nameGenre = router.query.id.split('-')[1]
    const id = router.query.id.split('-')[0]
    const [data, setData] = useState(null)

    const [totalResult, setTotalResult] = useState(data === null ? movieByGenre.total_results : data.total_results)
    const [pages, setPage] = useState(data === null ? movieByGenre.page : data.page)
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
        getData(`https://api.themoviedb.org/3/genre/${router.query.id}/movies?api_key=${process.env.API_KEY}&page=${pageNumber}`)
    }
    return (
        <Fragment>
            <Head>
                <title>movies genre {nameGenre}</title>
            </Head>
            <div className="px-3 md:container md:mx-auto py-3">
                <FlipMove className="flex space-x-4 md:space-x-7 whitespace-nowrap overflow-x-scroll no-scrollbar my-2">
                    {genres.genres.map((genre, key) => {
                        return (
                            <Genre genre={genre} key={key} {...genre} isActive={parseInt(id) === genre.id ? true : false} />
                        )
                    })}
                </FlipMove>
                <h1 className="text-yellow-500 text-xl uppercase mb-3">movies genre {nameGenre}</h1>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-hidden">
                    {data !== null ? data.results.map((result, i) => {
                        return (
                            <Card imgWidth={400} imgHeight={580} result={result} key={i} link={`/detail/movie/${result.id}-${slugify(result.title || result.name, {lower: true})}`} />
                        )
                    }) :
                    movieByGenre.results.map((result, i) => {
                        return (
                            <Card imgWidth={400} imgHeight={580} result={result} key={i} link={`/detail/movie/${result.id}-${slugify(result.title || result.name, {lower: true})}`} />
                        )
                    })
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
    const { id } = context.query
    const requestMovieByGenre = await fetch(`https://api.themoviedb.org/3/genre/${id}/movies?api_key=${process.env.API_KEY}`) 
    const movieByGenre = await requestMovieByGenre.json()

    const genreMovie = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`)
    const genres = await genreMovie.json()

    return {
        props : {
            movieByGenre,
            genres
        }
    }
}

export default GenreDetail