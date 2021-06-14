import { forwardRef, Fragment, useEffect, useState } from "react"
import Image from 'next/image'
import Link from "next/link"
import slugify from "slugify"

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
                                    <div className="cursor-pointer group">
                                        <Image 
                                            src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                                            alt={ result.title }
                                            width={400}
                                            height={580}
                                            className="rounded"
                                        />
                                        <span className="truncate text-sm block text-white group-hover:underline">{result.title}</span>
                                    </div>
                                </Link>
                            )
                        } else {
                            if(key < total) {
                                return (
                                    <Link ref={ref} key={key} href={`/detail/movie/${result.id}-${slugify(result.title || result.name, {
                                        lower: true
                                    })}`}>
                                        <div className="cursor-pointer group">
                                            <Image 
                                                src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                                                alt={ result.title }
                                                width={400}
                                                height={580}
                                                className="rounded"
                                            />
                                            <h1 className="truncate text-sm text-white group-hover:underline">{result.title}</h1>
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