import Head from 'next/head';
import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import EachData from '../../../components/EachData';
import slugify from 'slugify';

function DetailMovie({ getDetail, similarMovies }) {
    const crewPopular = getDetail.credits.crew.filter(crew => {
        if(crew.popularity >= 1) {
            return crew.job == "Screenplay"  || crew.job == "Story" || crew.job == "Director" || crew.job == "Novel"
        }
    })
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
            <div>
                <div className="min-h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${getDetail.backdrop_path})` }}>
                    <div className="bg-gray-900 bg-opacity-90 bg-cover min-h-full">
                        <div className="container mx-auto py-8">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-3 bg-cover bg-center min-h-full relative">
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
                    <div className="grid grid-cols-12">
                        <div className="col-span-9">
                            <span className="block text-lg py-1 text-yellow-500">Top Billed Cast</span>
                            
                            <EachData data={similarMovies} title="Similar movies" />
                        </div>
                        <div className="col-span-3">

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
} 

export async function getServerSideProps(context) {  
    const { movie_id } = context.query
    const movieId = movie_id.split('-')[0]
    
    const detailReq = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f52aa1a7c260685a467d566a4b94825f&append_to_response=credits`)
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