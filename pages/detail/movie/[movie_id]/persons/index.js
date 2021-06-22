import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import slugify from "slugify";
import BannerHeading from "../../../../../components/BannerHeading";

function ListPersonByMovie({getListCredits, getDetailMovie}) {
    var filterGettingDepartement = getListCredits.crew.map(crew => {
        return crew.department
    })
    filterGettingDepartement = filterGettingDepartement.filter((v, i) => filterGettingDepartement.indexOf(v) === i)
     
    return (
        <Fragment>
            <Head>
                <title>{getDetailMovie.title || getDetailMovie.original_title} - Cast & crew | LUX online movie rating</title>
                <meta name="description" content={getDetailMovie.overview} />
                <meta property="og:title" id="titleOg" content={`${getDetailMovie.title || getDetailMovie.original_title} - Cast & crew | LUX online movie rating`} />
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
                urlPage={`/detail/movie/${getDetailMovie.id}-${slugify(getDetailMovie.title || getDetailMovie.original_title, {lower: true})}`}
            />
            <div className="md:container md:mx-auto mx-3 mt-3">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <div>
                        <h4 className="text-yellow-500 mb-3 text-lg">Cast[{getListCredits.cast.length}]</h4>
                        <ul className="flex flex-col justify-start items-start space-y-3">
                            {getListCredits.cast.map((cast, key) => {
                                return (
                                    <li key={key} className="flex justify-start items-center space-x-3">
                                        <Image 
                                            src={cast.profile_path !== null ? `https://image.tmdb.org/t/p/w132_and_h132_face${cast.profile_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                            alt={cast.name || cast.original_name}
                                            width={70}
                                            height={70}
                                            className="block rounded"
                                        />
                                        <div className="flex flex-col justify-start items-start">
                                            <Link href={`/detail/person/${cast.id}`}>
                                                <span className="cursor-pointer text-lg font-bold text-gray-500 text-opacity-80 hover:text-opacity-60">{cast.name || cast.original_name}</span>
                                            </Link>
                                            <span className="text-gray-600 italic text-xs">{cast.character}</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-yellow-500 mb-3 text-lg">Crew[{getListCredits.crew.length}]</h4>
                        <ul className="flex flex-col justify-start items-start space-y-3">
                            {filterGettingDepartement.map((department, key) => {
                                return (
                                    <li key={key} className="block">
                                        <span className="block text-gray-500 text-lg font-bold">{department}</span>
                                        <ul className="flex flex-col space-y-2 mt-3">
                                            {getListCredits.crew.map((crew, i) => {
                                                if(crew.department == department) {
                                                    return (
                                                        <li key={i} className="flex justify-start items-center space-x-3">
                                                            <Image 
                                                                src={crew.profile_path !== null ? `https://image.tmdb.org/t/p/w132_and_h132_face${crew.profile_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                                                alt={crew.name || crew.original_name}
                                                                width={70}
                                                                height={70}
                                                                className="block rounded"
                                                            />
                                                            <div className="flex flex-col justify-start items-start">
                                                                <Link href={`/detail/person/${crew.id}`}>
                                                                    <span className="cursor-pointer text-lg font-bold text-gray-500 text-opacity-80 hover:text-opacity-60">{crew.name || crew.original_name}</span>
                                                                </Link>
                                                                <span className="text-gray-600 italic text-xs">{crew.job}</span>
                                                            </div>
                                                        </li>   
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const { movie_id } = context.query

    const credits = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.API_KEY}`)
    const getListCredits = await credits.json()

    const detailMovie = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.API_KEY}`)
    const getDetailMovie = await detailMovie.json()

    return {
        props: {
            getListCredits,
            getDetailMovie
        }
    }
}

export default ListPersonByMovie