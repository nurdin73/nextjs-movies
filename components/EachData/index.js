import { forwardRef, Fragment, useEffect, useState } from "react"
import Image from 'next/image'
import Link from "next/link"
import slugify from "slugify"
import DateStr from "../DateStr";

const EachData = forwardRef(({ data, title, total = 8 }, ref) => {
    if(data === null) {
        return (
            <div>
                <div className="animate-pulse py-2">
                    <div className="h-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded w-44 mb-2"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto md:overflow-hidden">
                        <div>
                            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                            <div className="h-3 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                        </div>
                        <div>
                            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                            <div className="h-3 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                        </div>
                        <div>
                            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                            <div className="h-3 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                        </div>
                        <div>
                            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                            <div className="h-3 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                        </div>
                        <div>
                            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                            <div className="h-3 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                        </div>
                        <div>
                            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                            <div className="h-3 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                        </div>
                        <div>
                            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                            <div className="h-3 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                        </div>
                        <div>
                            <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                            <div className="h-3 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        if(data.results.length < 1) {
            return (
                <Fragment>
                    <h2 className="text-yellow-500 text-bold text-2xl">{ title }</h2>
                    <hr className="my-2" />
                    <div className="bg-blue-200 px-3 py-5 text-blue-500 rounded">
                        Similar movies not found
                    </div>
                </Fragment>
            )
        }
    
        return (
            <Fragment>
                <div className="py-2">
                    <h2 className="text-yellow-500 text-bold text-md md:text-2xl">{ title }</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto md:overflow-hidden">
                    {data.results.map((result, key) => {
                        if(total == "max") {
                            return (
                                <Link ref={ref} key={key} href={`/detail/movie/${result.id}-${slugify(result.title || result.name, {
                                    lower: true
                                })}`}>
                                    <div className="cursor-pointer shadow-sm">
                                        <div className="relative overflow-hidden group rounded">
                                            <Image 
                                                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                                alt={ result.title }
                                                width={400}
                                                height={580}
                                                loading="lazy"
                                            />
                                            <span className="block absolute right-0 rounded-bl-lg border-gray-500 shadow-md rounded-tr-sm text-sm top-0 w-10 text-center font-bold py-0.5 lg:bg-gray-900 bg-gray-800 text-gray-400">{result.vote_average.toFixed(1)}</span>
                                            {/* <span className="absolute left-0 py-0.5 px-1 truncate text-gray-500 rounded-tr-lg bottom-11 text-xs lg:bg-gray-900 bg-gray-800 w-16 text-center">
                                                {language[0].name}
                                            </span> */}
                                            <div className="absolute left-0 right-0 -bottom-0 px-1 py-1 lg:bg-gray-900 bg-gray-800 text-white">
                                                <span className="truncate text-sm block -mb-2 text-white group-hover:underline">{result.title || result.original_title || result.name || result.original_name}</span>
                                                <span style={{ fontSize: '.6rem' }} className="text-gray-500 italic leading-3"><DateStr date={result.release_date || result.first_air_date} /></span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        } else {
                            if(key < total) {
                                return (
                                    <Link ref={ref} key={key} href={`/detail/movie/${result.id}-${slugify(result.title || result.name, {
                                        lower: true
                                    })}`}>
                                        <div className="cursor-pointer shadow-sm">
                                        <div className="relative overflow-hidden group rounded">
                                            <Image 
                                                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                                alt={ result.title }
                                                width={400}
                                                height={580}
                                                loading="lazy"
                                            />
                                            <span className="block absolute right-0 rounded-bl-lg border-gray-500 shadow-md rounded-tr-sm text-sm top-0 w-10 text-center font-bold py-0.5 lg:bg-gray-900 bg-gray-800 text-gray-400">{result.vote_average}</span>
                                            {/* <span className="absolute left-0 py-0.5 px-1 truncate text-gray-500 rounded-tr-lg bottom-11 text-xs lg:bg-gray-900 bg-gray-800 w-16 text-center">
                                                {language[0].name}
                                            </span> */}
                                            <div className="absolute left-0 right-0 -bottom-0 px-1 py-1 lg:bg-gray-900 bg-gray-800 text-white">
                                                <span className="truncate text-sm block -mb-2 text-white group-hover:underline">{result.title || result.original_title || result.name || result.original_name}</span>
                                                <span style={{ fontSize: '.6rem' }} className="text-gray-500 italic leading-3"><DateStr date={result.release_date || result.first_air_date} /></span>
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                )
                            }
                        }
                    })}
                    </div>
                </div>
            </Fragment>
        )
    }
})

export default EachData