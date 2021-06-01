import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import slugify from "slugify";
import DateStr from "../../../components/DateStr";

function TVDetail({ getDetail, languages, recommendations }) { 
 
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
    return (
        <Fragment>
            <Head>
                <title>{getDetail.name || getDetail.original_name} | LUX movie rating</title>
                <meta name="description" content={getDetail.overview} />
                <meta property="og:title" id="titleOg" content={ getDetail.name || getDetail.original_name + " | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ getDetail.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${getDetail.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <div className="md:hidden block">
                <div className="h-96 min-h-full bg-cover bg-no-repeat bg-top relative" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${getDetail.poster_path})` }}>
                    <div className="h-28 bg-gradient-to-t from-gray-900 absolute left-0 right-0 -bottom-1"></div>
                </div>
                <div className="px-3 py-2">
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
                    <h2 className="mt-2 text-yellow-500 text-lg">{getDetail.name || getDetail.original_name}</h2>
                    <span className="block text-xs text-gray-600 italic mb-2">{getDetail.tagline}</span>
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
                    <h2 className="mt-2 text-gray-500 text-lg">Season <span className="bg-gray-800 bg-opacity-70 rounded text-sm px-2">{getDetail.number_of_seasons}</span></h2>
                    <ul className="flex overflow-x-scroll no-scrollbar gap-3">
                        {getDetail.seasons.map((season, key) => {
                            return (
                                <Link key={key} href={`/detail/${getDetail.id}/season/${season.season_number}`}>
                                    <li className="flex-1" style={{ minWidth: '33%' }}>
                                        <Image 
                                            src={season.poster_path !== null ? `https://image.tmdb.org/t/p/original${season.poster_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                            alt={season.name || season.original_name}
                                            width={500}
                                            height={670}
                                            className="rounded"
                                        />
                                    </li>
                                </Link>
                            )
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
                            <small className="font-bold text-gray-500 md:text-white text-sm md:text-md truncate">First air date</small>
                            <span className="font-thin text-white text-xs text-opacity-70">{getDetail.first_air_date}</span>
                        </li>
                        <li className="flex flex-col items-start justify-start">
                            <span className="font-bold text-gray-500 md:text-white text-sm md:text-md">Last air date</span>
                            <span className="font-thin text-white text-xs text-opacity-70">{getDetail.last_air_date}</span>
                        </li>
                        <li className="flex flex-col col-span-2 items-start justify-start">
                            <span className="font-bold text-gray-500 md:text-white text-sm md:text-md">Keywords</span>
                            <ul className="flex flex-wrap gap-2 mt-2">
                                {getDetail.keywords.results.map((keyword, key) => {
                                    return (
                                        <Link key={key} href={`/detail/keyword/${keyword.id}-${slugify(keyword.name, { lower: true })}`}>
                                            <li className="flex-initial text-xs text-white text-opacity-50 cursor-pointer hover:bg-opacity-50 transition duration-200 bg-gray-800 bg-opacity-50 px-2 rounded text-center">{keyword.name}</li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </li>
                    </ul>
                    <h2 className="mt-2 text-gray-500 text-lg">Recommendations</h2>
                    <ul className="grid grid-cols-3 gap-3">
                        {recommendations.results.map((recom, key) => {
                            if(key < 3) {
                                return (
                                    <Link href={`/detail/tv/${recom.id}-${slugify(recom.name, {
                                        lower: true
                                    })}`} key={key}>
                                        <li className="group">
                                            <Image 
                                                src={recom.poster_path !== null ? `https://image.tmdb.org/t/p/original${recom.poster_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                                alt={recom.name || recom.original_name}
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


export function ReviewList({ reviews = [] }) {  
    if(reviews.results.length > 0) {
        return (
            <ul className="md:p-5 flex flex-col space-y-2 rounded bg-gray-900">
                {reviews.results.map((review, key) => {
                    if(key < 1) {
                        return (
                            <li key={key} className="border-gray-800">
                                <div className="grid grid-cols-12 md:gap-4">
                                    <div className="col-span-1 hidden md:block">
                                        <Image 
                                            src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
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
                })}
            </ul>
        )
    } else {
        return (
            <Fragment>
                <div className="bg-gray-900 text-gray-500 rounded">
                    Reviews not found
                </div>
            </Fragment>
        )
    }
}

export async function getServerSideProps(context) {  
    const { tv_id } = context.query
    const tvId = tv_id.split('-')[0]
    
    const api = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=f52aa1a7c260685a467d566a4b94825f&append_to_response=credits,keywords,videos,images,reviews,release_dates`)
    const getDetail = await api.json()

    const reqLang = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const languages = await reqLang.json()

    const apiRecommendation = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const recommendations = await apiRecommendation.json()

    return {
        props: {
            getDetail,
            languages,
            recommendations
        }
    }
}

export default TVDetail