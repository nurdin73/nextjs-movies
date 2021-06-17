import { Fragment, useEffect, useState } from "react"
import Image from 'next/image'
function Banner({results}) {

    
    
    return (
        <Fragment>
            <div className="relative h-24 sm:h-64 lg:h-96 mb-2"> {/* induk */}
                <div className="h-full relative overflow-hidden"> {/* container */}
                    <ul className="h-full relative p-0 m-0">
                        {results.map((result, key) => {
                            if(key < 6) {
                                return (
                                    <li key={key} className={`absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden`}>
                                        <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                                            <Image 
                                                src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                                                width={1500}
                                                height={500}
                                                alt={result.name || result.title}
                                                className="w-full h-full object-cover rounded-md lg:rounded-none mix-blend-overlay"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className="absolute bottom-0 left-0 right-0">{result.name || result.title}</span>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default Banner