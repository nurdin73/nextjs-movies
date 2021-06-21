import { Fragment, useEffect, useState } from "react"
import Image from 'next/image'
import Link from "next/link"
import DateStr from "../DateStr"
import slugify from "slugify"
function Banner({results}) {
    return (
        <Fragment>
            <div className="grid md:grid-cols-2 gap-4 h-40 sm:h-64 lg:h-96">
                <div className="h-full relative overflow-hidden rounded">
                    <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                        <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                            <Image 
                                src={`https://image.tmdb.org/t/p/original${results[0].backdrop_path}`}
                                width={700}
                                height={500}
                                alt={results[0].name || results[0].title}
                                className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                loading="lazy"
                            />
                        </div>
                        <div className="absolute p-2 bottom-0 left-0 right-0 flex justify-start items-start flex-col bg-gradient-to-t from-gray-900 to-transparent">
                            <span className="bg-yellow-500 bg-opacity-40 px-5 text-sm rounded">{results[0].vote_average}</span>
                            <Link href={`/detail/${results[0].media_type}/${results[0].id}-${slugify(results[0].name || results[0].title, { lower:true })}`}>
                                <span className="text-lg w-full truncate block cursor-pointer hover:underline text-gray-200 font-bold">{results[0].name || results[0].title}</span>
                            </Link>
                            <span className="text-xs text-justify truncate w-full text-gray-200">{results[0].overview}</span>
                            <span style={{ fontSize: '.6rem' }} className="italic text-gray-200 font-medium"><DateStr date={results[0].release_date || results[0].first_air_date} /></span>
                        </div>
                    </div>
                </div>
                <div className="hidden grid-cols-2 gap-4 md:grid">
                    <div className="h-full relative overflow-hidden rounded">
                        <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                            <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${results[1].backdrop_path}`}
                                    width={700}
                                    height={500}
                                    alt={results[1].name || results[1].title}
                                    className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute p-2 bottom-0 left-0 right-0 flex justify-start items-start flex-col bg-gradient-to-t from-gray-900 to-transparent">
                                <span className="bg-yellow-500 bg-opacity-40 px-2.5 text-xs rounded">{results[1].vote_average}</span>
                                <Link href={`/detail/${results[1].media_type}/${results[1].id}-${slugify(results[1].name || results[1].title, { lower:true })}`}>
                                    <span className="text-md w-full truncate cursor-pointer hover:underline text-gray-200 font-bold">{results[1].name || results[1].title}</span>
                                </Link>
                                <span style={{ fontSize: '.6rem' }} className="italic text-gray-200 font-medium"><DateStr date={results[1].release_date || results[1].first_air_date} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="h-full relative overflow-hidden rounded">
                        <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                            <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${results[2].backdrop_path}`}
                                    width={700}
                                    height={500}
                                    alt={results[2].name || results[2].title}
                                    className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute p-2 bottom-0 left-0 right-0 flex justify-start items-start flex-col bg-gradient-to-t from-gray-900 to-transparent">
                                <span className="bg-yellow-500 bg-opacity-40 px-2.5 text-xs rounded">{results[2].vote_average}</span>
                                <Link href={`/detail/${results[2].media_type}/${results[2].id}-${slugify(results[2].name || results[2].title, { lower:true })}`}>
                                    <span className="text-md w-full truncate cursor-pointer hover:underline text-gray-200 font-bold">{results[2].name || results[2].title}</span>
                                </Link>
                                <span style={{ fontSize: '.6rem' }} className="italic text-gray-200 font-medium"><DateStr date={results[2].release_date || results[2].first_air_date} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="h-full relative overflow-hidden rounded">
                        <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                            <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${results[3].backdrop_path}`}
                                    width={700}
                                    height={500}
                                    alt={results[3].name || results[3].title}
                                    className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute p-2 bottom-0 left-0 right-0 flex justify-start items-start flex-col bg-gradient-to-t from-gray-900 to-transparent">
                                <span className="bg-yellow-500 bg-opacity-40 px-2.5 text-xs rounded">{results[3].vote_average}</span>
                                <Link href={`/detail/${results[3].media_type}/${results[3].id}-${slugify(results[3].name || results[3].title, { lower:true })}`}>
                                    <span className="text-md w-full truncate cursor-pointer hover:underline text-gray-200 font-bold">{results[3].name || results[3].title}</span>
                                </Link>
                                <span style={{ fontSize: '.6rem' }} className="italic text-gray-200 font-medium"><DateStr date={results[3].release_date || results[3].first_air_date} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="h-full relative overflow-hidden rounded">
                        <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                            <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${results[4].backdrop_path}`}
                                    width={700}
                                    height={500}
                                    alt={results[4].name || results[4].title}
                                    className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute p-2 bottom-0 left-0 right-0 flex justify-start items-start flex-col bg-gradient-to-t from-gray-900 to-transparent">
                                <span className="bg-yellow-500 bg-opacity-40 px-2.5 text-xs rounded">{results[4].vote_average}</span>
                                <Link href={`/detail/${results[4].media_type}/${results[4].id}-${slugify(results[4].name || results[4].title, { lower:true })}`}>
                                    <span className="text-md w-full truncate cursor-pointer hover:underline text-gray-200 font-bold">{results[4].name || results[4].title}</span>
                                </Link>
                                <span style={{ fontSize: '.6rem' }} className="italic text-gray-200 font-medium"><DateStr date={results[4].release_date || results[4].first_air_date} /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Banner