import { Fragment } from "react"
import Head from 'next/head'
import EachData from "../../../components/EachData"



function MovieByKeyword({ getDetail, getMovies }) {
    return (
        <Fragment>
            <Head>
                <title>Movie list by keyword {getDetail.name}</title>
            </Head>
            <div className="mx-4 py-3 md:container md:mx-auto">
                <EachData data={getMovies} title={`Movie keyword ${getDetail.name}`} total="max" />
                <div className="flex justify-center items-center py-5">
                    <button className="px-5 py-1 rounded bg-yellow-600 block text-lg">Tampilkan lebih banyak</button>
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