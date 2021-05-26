import Head from 'next/head';
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import EachData from '../../../components/EachData';

function DetailMovie({ getDetail, similarMovies }) {
    console.log(getDetail);
    const router = useRouter()
    const {movie_id} = router.query
    return (
        <Fragment>
            <Head>
                <title>{getDetail.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={getDetail.overview} />
                <meta property="og:title" id="titleOg" content={ getDetail.title } />
                <meta property="og:description" id="descOg" content={ getDetail.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${getDetail.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <div className="container mx-auto">
                {movie_id}
                <EachData data={similarMovies} title="Similar movies" />
            </div>
        </Fragment>
    )
} 

export async function getServerSideProps(context) {  
    const { movie_id } = context.query
    
    const detailReq = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const getDetail = await detailReq.json()

    const sm = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const similarMovies = await sm.json()
    return {
        props: {
            getDetail: getDetail,
            similarMovies: similarMovies
        }
    }
}

export default DetailMovie