import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import slugify from 'slugify'
import DateStr from '../DateStr'
function Hero({ result, title = "", h = 40, sm = 64, md = 72, lg = 96, isHidden = false, media_type = "" }) {
    return (
        <Fragment>
            {/* <h3 className="text-md sm:text-lg md:text-xl lg:text-2xl text-yellow-500 font-bold my-3">{title}</h3> */}
            <div className={`relative h-${h} sm:h-${sm} md:h-${md} lg:h-${lg} mb-2 my-4 ${isHidden && `hidden md:block`}`}>
                <div className="h-full relative overflow-hidden rounded">
                    <div className="h-full relative p-0 m-0">
                        <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                            <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${result.backdrop_path}`}
                                    width={1500}
                                    height={800}
                                    alt={result.name || result.title}
                                    className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute p-2 bottom-0 left-0 right-0 flex justify-start items-start flex-col bg-gradient-to-t from-gray-900 to-transparent">
                                <span className="bg-yellow-500 bg-opacity-40 md:px-5 md:text-sm px-3 text-xs rounded">{result.vote_average}</span>
                                <Link href={`/detail/${media_type !== "" ? media_type : result.media_type}/${result.id}-${slugify(result.name || result.title, { lower:true })}`}>
                                    <span className="md:text-xl text-md w-full truncate block cursor-pointer hover:underline text-gray-200 font-bold">{result.name || result.title}</span>
                                </Link>
                                <span className="lg:text-sm text-xs text-justify truncate w-full text-gray-200">{result.overview}</span>
                                <span style={{ fontSize: '.6rem' }} className="italic text-gray-200 font-medium"><DateStr date={result.release_date || result.first_air_date} /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Hero