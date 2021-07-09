import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import EachData from '../../../../components/EachData';
import slugify from 'slugify';
import TopBilledCast from '../../../../components/TopBilledCast';
import DateStr from '../../../../components/DateStr';
import Media from '../../../../components/Media';
import Cookies from 'js-cookie';
import Mark from '../../../../components/Mark';

function DetailMovie({ getDetail, recommendations, languages }) {
    const router = useRouter()
    const [mediaView, setMediaView] = useState('videos')

    const keywordAll = getDetail.keywords.keywords.map(keyword => {
        return keyword.name
    })
    
    var crewPopular = getDetail.credits.crew.filter(crew => {
        if(crew.popularity >= 1) {
            return crew.job == "Screenplay"  || crew.job == "Story" || crew.job == "Director" || crew.job == "Novel"
        }
    })

    const filterLanguage = languages.filter(language => {
        return language.iso_639_1 === getDetail.original_language
    })

    var castPopular = getDetail.credits.cast.filter(cast => {
        if(cast.popularity >= 6.5) {
            return cast
        }
    })

    castPopular = castPopular.length === 0 ? getDetail.credits.cast.filter((cast, key) => {
        if(key < 6) {
            return cast
        }
    }) : castPopular

    const handleClickMedia = (media = "videos") => () => {
        setMediaView(media)
    }

    const cert = getDetail.release_dates.results.filter(release => {
        if(release.iso_3166_1 === getDetail.production_countries[0]?.iso_3166_1) {
            return release.release_dates[0]?.certification
        }
    })
    

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Movie",
        "url": `/detail/movie/${getDetail.id}-${slugify(getDetail.title || getDetail.name, {lower: true})}`,
        "name": getDetail.title || getDetail.original_title,
        "image": `https://image.tmdb.org/t/p/original${getDetail.poster_path}`,
        "contentRating": cert[0]?.release_dates[0]?.certification || "PG-13",
        "genre": getDetail.genres.map(genre => genre.name),
        "actor": castPopular.map((cast) => {
            return {
                "@type":"Person",
                "url" : `/detail/person/${cast.id}-${slugify(cast.name, {lower: true})}`,
                "name" : cast.name
            }
        }),
        "director": crewPopular.map(crew => {
            if(crew.job === "Director") {
                return {
                    "@type":"Person",
                    "url" : `/detail/person/${crew.id}-${slugify(crew.name, {lower: true})}`,
                    "name" : crew.name
                }
            }
        }),
        "trailer": {
            "@type":"VideoObject",
            "name": getDetail.videos.results[0]?.name,
            "embedUrl": `https://www.youtube.com/embed/${getDetail.videos.results[0]?.key}`,
            "thumbnail": {
                "@type": "ImageObject",
                "contentUrl": `https://img.youtube.com/vi/${getDetail.videos.results[0]?.key}/0.jpg`
            },
            "thumbnailUrl": `https://img.youtube.com/vi/${getDetail.videos.results[0]?.key}/0.jpg`,
            "description": getDetail.overview,
            "uploadDate": getDetail.release_date
        },
        "datePublished":getDetail.release_date,
        "description": getDetail.overview,
        "keywords": keywordAll.join(','),
        "aggregateRating": {
            "@type":"AggregateRating",
            "ratingCount": getDetail.vote_count,
            "bestRating": 10,
            "worstRating": 1,
            "ratingValue": getDetail.vote_average
        },
        "duration": getDetail.runtime
    }
    

    return (
        <Fragment>
            <Head>
                <title>{getDetail.title} | LUX movie rating</title>
                <meta name="description" content={getDetail.overview} />
                <meta name="keywords" content={keywordAll.join(',')} />
                <meta property="og:title" id="titleOg" content={ getDetail.title + " | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ getDetail.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${getDetail.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
                ></script>
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
                                    <Mark media_type="movie" media_id={getDetail.id} />
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
                                    <Link href={`/detail/movie/${getDetail.id}-${slugify(getDetail.title || getDetail.original_title, {lower:true})}/persons`}>
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
                                    <Link href={`/detail/movie/${getDetail.id}-${slugify(getDetail.title || getDetail.original_title, {lower:true})}/reviews`}>
                                        <span className="text-gray-500 hover:text-opacity-70 transition duration-200 cursor-pointer text-xs">View all review</span>
                                    </Link> : ""
                                }
                            </div>
                            <ReviewList reviews={getDetail.reviews} />
                            {getDetail.belongs_to_collection !== null ? 
                            <div className="relative h-64 mb-2 my-4">
                                <div className="h-full relative overflow-hidden rounded">
                                    <div className="h-full relative p-0 m-0">
                                        <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                                            <div className="relative overflow-hidden bg-gradient-to-r from-black to-transparent">
                                                <Image 
                                                    src={`https://image.tmdb.org/t/p/w1440_and_h320_multi_faces${getDetail.belongs_to_collection.backdrop_path}`}
                                                    width={1440}
                                                    height={500}
                                                    alt={getDetail.belongs_to_collection.name || getDetail.belongs_to_collection.title}
                                                    className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="absolute p-2 bottom-0 left-0 right-0 flex justify-start items-start flex-col">
                                                <Link href={`/detail/collection/${getDetail.belongs_to_collection.id}-${slugify(getDetail.belongs_to_collection.name || getDetail.belongs_to_collection.title, { lower:true })}`}>
                                                    <span className="md:text-xl text-md w-full truncate block cursor-pointer hover:underline text-gray-200 font-bold">Part of the {getDetail.belongs_to_collection.name || getDetail.belongs_to_collection.title}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            : ""
                            }
                            <Media videos={getDetail.videos} backdrops={getDetail.images.backdrops} posters={getDetail.images.posters} />
                            <EachData data={recommendations} title="Recommendations" />
                        </div>
                        <div className="col-span-3">
                            <ul className="list-none flex flex-col items-start justify-start space-y-2 mt-2">
                                <li className="flex flex-col items-start justify-start">
                                    <span className="font-bold text-white text-md">Status</span>
                                    <span className="font-thin text-white text-sm text-opacity-70">{getDetail.status}</span>
                                </li>
                                <li className="flex flex-col items-start justify-start">
                                    <span className="font-bold text-white text-md">Original language</span>
                                    <span className="font-thin text-white text-sm text-opacity-70">{filterLanguage[0].english_name}</span>
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
                <div className="h-96 min-h-full bg-cover bg-no-repeat bg-top relative" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${getDetail.poster_path})` }}>
                    <div className="h-28 bg-gradient-to-t from-gray-900 absolute left-0 right-0 -bottom-1"></div>
                </div>
                <div className="px-3 py-2">
                    <div className="flex justify-between mt-1 items-center">
                        <ul className="flex flex-wrap gap-2 items-center">
                            <li key={getDetail.genres[0].id} className="flex-initial text-xs text-white text-opacity-50 cursor-pointer hover:bg-opacity-50 transition duration-200 bg-gray-800 bg-opacity-50 px-2 rounded text-center">
                                <Link href={`/genre/${getDetail.genres[0].id}-${getDetail.genres[0].name}`}>
                                    <span>{getDetail.genres[0].name}</span>
                                </Link> 
                            </li>
                            <li className="flex-initial flex justify-start items-center text-xs text-white text-opacity-50 cursor-pointer hover:bg-opacity-50 transition duration-200 bg-gray-800 bg-opacity-50 px-1 rounded text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{getDetail.vote_average}</span>
                            </li>
                        </ul>
                        <span className="text-xs text-gray-500">{getDetail.runtime} minutes</span>
                    </div>
                    <h2 className="mt-2 text-yellow-500 text-lg">{getDetail.title || getDetail.original_name}</h2>
                    <span className="block text-xs text-gray-600 italic mb-2">{getDetail.tagline}</span>
                    <Mark media_type="movie" media_id={getDetail.id} />
                    <p className="text-gray-500 text-sm text-justify">{getDetail.overview}</p>
                    <ul className="list-none grid grid-cols-3 gap-4 mt-3">
                        {crewPopular.map((crew, key) => {
                            if(key < 6) {
                                return (
                                    <li className="flex flex-col justify-start items-start" key={key}>
                                        <Link href={`/detail/person/${crew.id}-${slugify(crew.name || crew.original_name, {
                                            lower: true
                                        })}`}>
                                            <span className="font-bold truncate text-sm text-gray-500 cursor-pointer hover:text-opacity-70">{ crew.name.length > 13 ? crew.name.substr(0, 13) + "..." : crew.name || crew.original_name }</span>
                                        </Link>
                                        <small className="text-xs text-opacity-60 text-gray-500">{ crew.job }</small>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                    <h2 className="mt-2 text-gray-500 text-lg">Actor popular</h2>
                    <ul className="grid grid-cols-5 gap-2">
                        {castPopular.map((cast, key) => {
                            if(key < 5) {
                                return (
                                    <Link href={`/detail/person/${cast.id}-${slugify(cast.name || cast.original_name, {
                                        lower: true
                                    })}`} key={key}>
                                        <li className="">
                                            <Image 
                                                src={cast.profile_path !== null ? `https://image.tmdb.org/t/p/original${cast.profile_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                                alt={cast.name || cast.original_name}
                                                width={500}
                                                height={670}
                                                className="rounded"
                                            />
                                        </li>
                                    </Link>    
                                )
                            }
                        })}
                    </ul>
                    <h2 className="mt-2 text-gray-500 text-lg">Review</h2>
                    <ReviewList reviews={getDetail.reviews} />
                    <h2 className="mt-2 text-gray-500 text-lg">Info</h2>
                    <ul className="list-none grid grid-cols-2 gap-4 mt-3">
                        <li className="flex flex-col items-start justify-start">
                            <span className="font-bold text-gray-500 md:text-white text-sm md:text-md">Status</span>
                            <span className="font-thin text-white text-xs text-opacity-70">{getDetail.status}</span>
                        </li>
                        <li className="flex flex-col items-start justify-start">
                            <span className="font-bold text-gray-500 md:text-white text-sm md:text-md">Original language</span>
                            <span className="font-thin text-white text-xs text-opacity-70">{filterLanguage[0].english_name}</span>
                        </li>
                        <li className="flex flex-col items-start justify-start">
                            <span className="font-bold text-gray-500 md:text-white text-sm md:text-md">Budget</span>
                            <span className="font-thin text-white text-xs text-opacity-70">${parseInt(getDetail.budget).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                        </li>
                        <li className="flex flex-col items-start justify-start">
                            <span className="font-bold text-gray-500 md:text-white text-sm md:text-md">Revenue</span>
                            <span className="font-thin text-white text-xs text-opacity-70">${parseInt(getDetail.revenue).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                        </li>
                        <li className="flex flex-col col-span-2 items-start justify-start">
                            <span className="font-bold text-gray-500 md:text-white text-sm md:text-md">Keywords</span>
                            <ul className="flex flex-wrap gap-2 mt-2">
                                {getDetail.keywords.keywords.map((keyword, key) => {
                                    return (
                                        <Link key={key} href={`/detail/keyword/${keyword.id}-${slugify(keyword.name, { lower: true })}`}>
                                            <li className="flex-initial text-xs text-white text-opacity-50 cursor-pointer hover:bg-opacity-50 transition duration-200 bg-gray-800 bg-opacity-50 px-2 rounded text-center">{keyword.name}</li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </li>
                    </ul>
                    {getDetail.belongs_to_collection !== null ? 
                    <div className="relative md:h-64 h-28 mb-2 my-4">
                        <div className="h-full relative overflow-hidden rounded">
                            <div className="h-full relative p-0 m-0">
                                <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                                    <div className="relative overflow-hidden bg-gradient-to-r from-black to-transparent">
                                        <Image 
                                            src={`https://image.tmdb.org/t/p/w1440_and_h320_multi_faces${getDetail.belongs_to_collection.backdrop_path}`}
                                            width={1440}
                                            height={500}
                                            alt={getDetail.belongs_to_collection.name || getDetail.belongs_to_collection.title}
                                            className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute p-2 bottom-0 left-0 right-0 flex justify-start items-start flex-col">
                                        <Link href={`/detail/collection/${getDetail.belongs_to_collection.id}-${slugify(getDetail.belongs_to_collection.name || getDetail.belongs_to_collection.title, { lower:true })}`}>
                                            <span className="md:text-xl text-md w-full truncate block cursor-pointer hover:underline text-gray-200 font-bold">Part of the {getDetail.belongs_to_collection.name || getDetail.belongs_to_collection.title}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                    : ""
                    }
                    <Media videos={getDetail.videos} backdrops={getDetail.images.backdrops} posters={getDetail.images.posters} />
                    <h2 className="mt-2 text-gray-500 text-lg">Recommendations</h2>
                    <ul className="grid grid-cols-3 gap-3">
                        {recommendations.results.map((recom, key) => {
                            if(key < 3) {
                                return (
                                    <Link href={`/detail/movie/${recom.id}-${slugify(recom.title, {
                                        lower: true
                                    })}`} key={key}>
                                        <li className="group">
                                            <Image 
                                                src={recom.poster_path !== null ? `https://image.tmdb.org/t/p/original${recom.poster_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                                alt={recom.title || recom.original_title}
                                                width={500}
                                                height={670}
                                                className="rounded"
                                            />
                                            <span className="block truncate text-sm -mt-1 text-gray-500 group-hover:underline">{recom.title}</span>
                                        </li>
                                    </Link>
                                )
                            }
                        })}
                    </ul>            
                </div>
            </div>
            
        </Fragment>
    )
} 

export function ReviewList({ reviews = [], total = 1 }) {  

    const handleErrorImage = () => (image) => {
        image.onerror = ""
        image.src = "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"
        return true
    }

    if(reviews.results.length > 0) {
        return (
            <ul className="flex flex-col justify-start space-y-3 items-start">
                {reviews.results.map((review, key) => {
                    if(total === 1) {
                        if(key < 1) {
                            return (
                                <li key={key} className="md:p-5 rounded bg-gray-900">
                                    <div className="grid grid-cols-12 md:gap-4">
                                        <div className="col-span-1 hidden md:block">
                                            <Image 
                                                src={review.author_details.avatar_path !== null ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                                alt={review.author}
                                                width={70}
                                                height={70}
                                                className="rounded-full"
                                            />  
                                        </div>
                                        <div className="col-span-12 md:col-span-11">
                                            <div className="flex items-start flex-col justify-start">
                                                <Link href={`/detail/review/${review.id}`}>
                                                    <span className="text-gray-400 md:text-white text-md md:text-lg hover:text-opacity-70 cursor-pointer">A review by {review.author}</span>
                                                </Link>
                                                <span className="text-xs text-gray-600">
                                                    Written by 
                                                    <span className="mx-1 text-yellow-500 hover:text-opacity-60 hover:underline cursor-pointer">{review.author_details.username}</span>
                                                    on <DateStr date={review.created_at} />
                                                </span>
                                                <p className="text-gray-500 text-sm md:text-md text-justify">
                                                    {review.content.length > 250 ? review.content.substr(0, 250) + "..." : review.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    } else {
                        return (
                            <li key={key} className="md:p-5 rounded bg-gray-900">
                                <div className="grid grid-cols-12 md:gap-4">
                                    <div className="col-span-1 hidden md:block">
                                        <Image 
                                            src={review.author_details.avatar_path !== null ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                            alt={review.author}
                                            width={70}
                                            height={70}
                                            className="rounded-full"
                                            onError={handleErrorImage()}
                                        />  
                                    </div>
                                    <div className="col-span-12 md:col-span-11 group">
                                        <div className="flex items-start flex-col justify-start">
                                            <Link href={`/detail/review/${review.id}`}>
                                                <span className="text-gray-400 md:text-white text-md md:text-lg hover:text-opacity-70 cursor-pointer">A review by {review.author}</span>
                                            </Link>
                                            <span className="text-xs text-gray-600">
                                                Written by 
                                                <span className="mx-1 text-yellow-500 hover:text-opacity-60 hover:underline cursor-pointer">{review.author_details.username}</span>
                                                on <DateStr date={review.created_at} />
                                            </span>
                                            <p className="text-gray-500 text-sm md:text-md text-justify">
                                                {review.content.length > 250 ? review.content.substr(0, 250) + "..." : review.content}
                                                <Link href={`/detail/review/${review.id}`}>
                                                    <span className="text-white group-hover:underline cursor-pointer">read more</span>
                                                </Link>
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
    
    const detailReq = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.API_KEY}&append_to_response=credits,keywords,videos,images,reviews,release_dates`)
    const getDetail = await detailReq.json()

    const sm = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${process.env.API_KEY}`)
    const recommendations = await sm.json()

    const reqLang = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.API_KEY}`)
    const languages = await reqLang.json()

    return {
        props: {
            getDetail: getDetail,
            recommendations: recommendations,
            languages,
        }
    }
}

export default DetailMovie