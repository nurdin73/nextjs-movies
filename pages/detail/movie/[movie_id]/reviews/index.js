import Head from "next/head"
import { Fragment } from "react"
import { ReviewList } from "..";
import BannerHeading from "../../../../../components/BannerHeading"

function getReviewsByMovie({ getDetailMovie, getListReviews }) {
    console.log(getListReviews);
    return (
        <Fragment>
            <Head>
                <title>{getDetailMovie.title || getDetailMovie.original_title} - Reviews | LUX online movie rating</title>
                <meta name="description" content={getDetailMovie.overview} />
                <meta property="og:title" id="titleOg" content={`${getDetailMovie.title || getDetailMovie.original_title} - Reviews | LUX online movie rating`} />
                <meta property="og:description" id="descOg" content={ getDetailMovie.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w58_and_h87_face${getDetailMovie.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <BannerHeading 
                title={getDetailMovie.title || getDetailMovie.original_title} 
                id_movie={getDetailMovie.id}
                tagline={getDetailMovie.tagline}
                poster={getDetailMovie.poster_path}
                release_date={getDetailMovie.release_date}
            />
            <div className="md:container md:mx-auto mx-3 mt-3 pb-3">
                <h3 className="text-gray-500 mb-2">Reviews[{getListReviews.total_results}]</h3>
                <ReviewList reviews={getListReviews} total="all" />
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const { movie_id } = context.query

    const reviews = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${process.env.API_KEY}`)
    const getListReviews = await reviews.json()

    const detailMovie = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.API_KEY}`)
    const getDetailMovie = await detailMovie.json()

    return {
        props: {
            getDetailMovie,
            getListReviews
        }
    }
}

export default getReviewsByMovie