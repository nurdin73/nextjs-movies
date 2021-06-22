import Head from "next/head"
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react"
import slugify from "slugify";
import DateStr from "../../../components/DateStr";

function ReviewDetail({detailReview, movieDetail}) {
    console.log(detailReview);
    return (
        <Fragment>
            <Head>
                <title>Review by {detailReview.author}</title>
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${detailReview.author_details.avatar_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <div className="mx-4 md:container md:mx-auto md:py-8">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                        <Image 
                            src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
                            alt={movieDetail.title}
                            width={300}
                            height={420}
                            className="block rounded"
                        />
                    </div>
                    <div className="col-span-9">
                        <Link href={`/detail/movie/${movieDetail.id}-${slugify(movieDetail.title || movieDetail.original_title, {lower: true})}`}>
                            <span className="text-gray-600 font-bold block md:text-xl truncate cursor-pointer hover:underline hover:text-opacity-60 transition duration-300">{movieDetail.title || movieDetail.original_title}</span>
                        </Link>
                        <div className="flex justify-start items-center mb-2 space-x-1">
                            <small className="text-yellow-500 text-opacity-50 font-bold bg-gray-800 px-1 rounded">{movieDetail.vote_average}</small>
                            <small className="block mt-1 text-opacity-50 text-gray-500 text-xs">{movieDetail.runtime} Minutes</small>
                        </div>
                        <small className="text-gray-600 bg-gray-800 px-2 py-1 rounded">{detailReview.media_type}</small>
                        <div className="hidden md:block">
                            <h1 className="text-md text-gray-500 md:text-lg">A review by {detailReview.author}</h1>
                            <span className="text-xs text-yellow-500 text-opacity-50">Writted at <DateStr date={detailReview.created_at} /></span>
                            <p className="text-gray-600 text-sm md:text-md text-justify">{detailReview.content}</p>
                        </div>
                    </div>
                    <div className="col-span-12 md:hidden block">
                        <h1 className="text-md text-gray-500">A review by {detailReview.author}</h1>
                        <span className="text-xs text-yellow-500 text-opacity-50">Writted at <DateStr date={detailReview.created_at} /></span>
                        <p className="text-gray-600 text-sm text-justify">{detailReview.content}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const {review_id} = context.query
    const review = await fetch(`https://api.themoviedb.org/3/review/${review_id}?api_key=${process.env.API_KEY}`)
    const detailReview = await review.json()

    const movie = await fetch(`https://api.themoviedb.org/3/movie/${detailReview.media_id}?api_key=${process.env.API_KEY}`)
    const movieDetail = await movie.json()

    return {
        props: {
            detailReview,
            movieDetail
        }
    }
}

export default ReviewDetail