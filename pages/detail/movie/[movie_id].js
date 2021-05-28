import Head from 'next/head';
import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import EachData from '../../../components/EachData';
import slugify from 'slugify';
import TopBilledCast from '../../../components/TopBilledCast';
import DateStr from '../../../components/DateStr';

function DetailMovie({ getDetail, similarMovies }) {
    const crewPopular = getDetail.credits.crew.filter(crew => {
        if(crew.popularity >= 1) {
            return crew.job == "Screenplay"  || crew.job == "Story" || crew.job == "Director" || crew.job == "Novel"
        }
    })

    const castPopular = getDetail.credits.cast.filter(cast => {
        if(cast.popularity >= 6.5) {
            return cast
        }
    })
    return (
        <Fragment>
            <Head>
                <title>{getDetail.title} | LUX movie rating</title>
                <meta name="description" content={getDetail.overview} />
                <meta property="og:title" id="titleOg" content={ getDetail.title + " | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ getDetail.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${getDetail.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <div className="hidden sm:block">
                <div className="min-h-full md:bg-cover md:bg-no-repeat md:bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${getDetail.backdrop_path})` }}>
                    <div className="bg-gray-900 bg-opacity-90 bg-cover min-h-full">
                        <div className="container mx-auto py-8">
                            <div className="grid md:grid-cols-12 justify-center gap-4 items-center">
                                <div className="col-span-5 justify-center md:col-span-3 bg-cover bg-center min-h-full relative">
                                    <Image 
                                        src={`https://image.tmdb.org/t/p/original${getDetail.poster_path}`}
                                        alt={getDetail.title}
                                        width={300}
                                        height={420}
                                        className="block rounded"
                                    />
                                    <span className="absolute left-3 top-3 bg-yellow-500 px-3 py-0 text-lg rounded">{getDetail.vote_average}</span>
                                </div>
                                <div className="col-span-9">
                                    <h1 className="text-4xl text-yellow-500 text-bold">
                                        {getDetail.title}
                                        <span className="text-xl text-gray-300 text-opacity-30">({getDetail.release_date.split('-')[0]})</span>
                                    </h1>
                                    <span className="block font-thin italic text-sm text-white text-opacity-80">{getDetail.tagline}</span>
                                    <span className="block py-1 text-lg text-white font-bold">Overview</span>
                                    <span className="block text-sm text-white text-opacity-80 font-light">{getDetail.overview}</span>
                                    <span className="block text-lg py-1 text-white font-bold">Genre</span>
                                    <ul className="flex items-center justify-start space-x-3 my-2">
                                        {getDetail.genres.map((genre, key) => {
                                            return (
                                                <li key={key} className="cursor-pointer text-yellow-900 px-2 rounded bg-yellow-500 hover:bg-yellow-600 hover:text-yellow-100 transition duration-500">
                                                    <Link href={`/genre/${genre.id}-${genre.name}`}>
                                                        <span>{genre.name}</span>
                                                    </Link> 
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <ul className="list-none grid grid-cols-3 gap-4 mt-3">
                                        {crewPopular.map((crew, key) => {
                                            if(key < 6) {
                                                return (
                                                    <li className="flex flex-col justify-start items-start" key={key}>
                                                        <Link href={`/detail/person/${crew.id}-${slugify(crew.name || crew.original_name, {
                                                            lower: true
                                                        })}`}>
                                                            <span className="font-bold truncate text-md text-white cursor-pointer hover:text-opacity-70">{ crew.name || crew.original_name }</span>
                                                        </Link>
                                                        <small className="text-sm text-opacity-60 text-white">{ crew.job }</small>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-9">
                            <div className="flex justify-between items-center">
                                <span className="block text-lg py-1 text-yellow-500">Top Billed Cast</span>
                                {
                                    castPopular.length > 0 ? 
                                    <Link href={`/detail/persons/${getDetail.id}`}>
                                        <span className="text-gray-500 hover:text-opacity-70 transition duration-200 cursor-pointer text-xs">View all cast & crew</span>
                                    </Link> : ""
                                }
                            </div>
                            <TopBilledCast casts={castPopular} />

                            <div className="flex justify-between items-center">
                                <div className="flex- justify-start items-center space-x-2 text-lg py-1 text-yellow-500">
                                    <span>Reviews</span> 
                                    <span className="bg-gray-700 text-white px-2 rounded text-sm">{getDetail.reviews.total_results}</span> 
                                </div>
                                {
                                    getDetail.reviews.results.length > 0 ? 
                                    <Link href={`/detail/movie/reviews/${getDetail.id}/`}>
                                        <span className="text-gray-500 hover:text-opacity-70 transition duration-200 cursor-pointer text-xs">View all review</span>
                                    </Link> : ""
                                }
                            </div>
                            <ReviewList reviews={getDetail.reviews} />
                            <EachData data={similarMovies} title="Similar movies" />
                        </div>
                        <div className="col-span-3">
                            <ul className="list-none flex flex-col items-start justify-start space-y-2 mt-2">
                                <li className="flex flex-col items-start justify-start">
                                    <span className="font-bold text-white text-md">Status</span>
                                    <span className="font-thin text-white text-sm text-opacity-70">{getDetail.status}</span>
                                </li>
                                <li className="flex flex-col items-start justify-start">
                                    <span className="font-bold text-white text-md">Original language</span>
                                    <span className="font-thin text-white text-sm text-opacity-70">{getDetail.original_language}</span>
                                </li>
                                <li className="flex flex-col items-start justify-start">
                                    <span className="font-bold text-white text-md">Budget</span>
                                    <span className="font-thin text-white text-sm text-opacity-70">${parseInt(getDetail.budget).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                                </li>
                                <li className="flex flex-col items-start justify-start">
                                    <span className="font-bold text-white text-md">Revenue</span>
                                    <span className="font-thin text-white text-sm text-opacity-70">${parseInt(getDetail.revenue).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                                </li>
                                <li className="flex flex-col items-start justify-start">
                                    <span className="font-bold text-white text-md">Keywords</span>
                                    <ul className="flex flex-wrap gap-2 mt-2">
                                        {getDetail.keywords.keywords.map((keyword, key) => {
                                            return (
                                                <Link key={key} href={`/detail/keyword/${keyword.id}-${slugify(keyword.name, { lower: true })}`}>
                                                    <li className="flex-auto text-sm text-white text-opacity-50 cursor-pointer hover:bg-opacity-50 transition duration-200 bg-gray-800 px-2 rounded text-center">{keyword.name}</li>
                                                </Link>
                                            )
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block sm:hidden">
                <div className="h-48 min-h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${getDetail.backdrop_path})` }}>
                    <div className="flex justify-between items-center bg-gray-900 px-3 py-2 bg-opacity-60">
                        <Link href="/">
                            <button className="outline-none focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                        </Link>
                        <span className="text-yellow-500 font-bold truncate">{ getDetail.title || getDetail.original_name }</span>
                    </div>
                </div>
                <div className="absolute left-0 right-0 bottom-0 top-40 rounded-t-3xl bg-gray-900 p-4">
                    <div className="flex justify-center items-center p-2">
                        <div className="w-2/4 relative">
                            <Image 
                                src={`https://image.tmdb.org/t/p/original${getDetail.poster_path}`}
                                alt={getDetail.title}
                                width={300}
                                height={420}
                                className="block rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
} 

export function ReviewList({ reviews = [] }) {  
    if(reviews.results.length > 0) {
        return (
            <ul className="p-5 flex flex-col space-y-2 rounded bg-gray-900">
                {reviews.results.map((review, key) => {
                    if(key < 1) {
                        return (
                            <li key={key} className="border-gray-800">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-1">
                                        <Image 
                                            src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
                                            alt={review.author}
                                            width={70}
                                            height={70}
                                            className="rounded-full"
                                        />  
                                    </div>
                                    <div className="col-span-11">
                                        <div className="flex items-start flex-col justify-start">
                                            <Link href={`/detail/review/${review.id}`}>
                                                <span className="text-white text-lg hover:text-opacity-70 cursor-pointer">A review by {review.author}</span>
                                            </Link>
                                            <span className="text-xs text-gray-600">
                                                Written by 
                                                <span className="mx-1 text-yellow-500 hover:text-opacity-60 hover:underline cursor-pointer">{review.author_details.username}</span>
                                                on <DateStr date={review.created_at} />
                                            </span>
                                            <p className="text-gray-500 text-md text-justify">
                                                {review.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
        )
    } else {
        return (
            <Fragment>
                <div className="bg-gray-900 px-3 py-2 text-gray-500 rounded">
                    Reviews not found
                </div>
            </Fragment>
        )
    }
}

export async function getServerSideProps(context) {  
    const { movie_id } = context.query
    const movieId = movie_id.split('-')[0]
    
    const detailReq = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f52aa1a7c260685a467d566a4b94825f&append_to_response=credits,keywords,videos,images,reviews`)
    const getDetail = await detailReq.json()

    const sm = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const similarMovies = await sm.json()

    return {
        props: {
            getDetail: getDetail,
            similarMovies: similarMovies
        }
    }
}

export default DetailMovie