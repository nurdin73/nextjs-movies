import { forwardRef, Fragment, useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import slugify from 'slugify'
import DateStr from "../DateStr";


const Tab = forwardRef(({dataset, title, type = [], isTrending = false, languages}, ref) => {
    const [activeTab, setActiveTab] = useState(type[0].name)
    const [data, setData] = useState(null)

    const handleClickTab = (nameTab = "movie", typeData = "popular") => () => {
        setActiveTab(nameTab)
        async function getData(url = "") {
            const res = await fetch(url)
            const response = await res.json()
            setData(response.results)
        }

        if(nameTab === "movie") {
            getData(`https://api.themoviedb.org/3/${isTrending === true ? "trending/" : ""}${nameTab}/${typeData}?api_key=f52aa1a7c260685a467d566a4b94825f`)
        } else if(nameTab === "tv") {
            getData(`https://api.themoviedb.org/3/${isTrending === true ? "trending/" : ""}${nameTab}/${typeData}?api_key=f52aa1a7c260685a467d566a4b94825f`)
        } else {
            getData(`https://api.themoviedb.org/3/${isTrending === true ? "trending/" : ""}${nameTab}/${typeData}?api_key=f52aa1a7c260685a467d566a4b94825f`)
        }
    }

    return (
        <Fragment>
            <div className="flex items-center justify-between my-3 border-b-4 border-gray-800 md:border-none">
                <h3 className="text-lg sm:text-lg md:text-xl lg:text-2xl text-yellow-500 font-bold">{title}</h3>
                <ul className="flex items-center justify-start space-x-2">
                    {
                        type.map((ty, i) => {
                            return (
                                <li key={i} onClick={handleClickTab(ty.name, ty.type)} className={`${activeTab === ty.name ? 'bg-yellow-800' : "lg:bg-gray-900 bg-gray-800"} lg:px-4 py-0.5 px-2 shadow-sm rounded text-gray-300 hover:bg-yellow-800 transition duration-200 cursor-pointer text-xs lg:text-lg`}>{ty.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto md:overflow-hidden">
                {data !== null ? data.map((result, key) => {
                    if(key < 8) {
                        return (
                            <PosterMovieTv result={result} key={key} tab={activeTab} ref={ref} languages={languages} />
                        )
                    }
                }) : dataset.results.map((result, key) => {
                if(key < 8) {
                    return (
                        <PosterMovieTv result={result} key={key} tab={activeTab} ref={ref} languages={languages} />
                    )
                }
                })}
            </ul>
        </Fragment>
    )
})


function PosterMovieTv({result, tab, ref, languages}) {
    const detail = tab === "all" ? result.media_type : tab;
    const language = languages.filter(lang => {
        return lang.iso_639_1 === result.original_language
    })
    return (
        <Link ref={ref} href={`/detail/${detail}/${result.id}-${slugify(result.title || result.name, {
            lower: true
        })}`}>
            <li className="cursor-pointer shadow-sm">
                <div className="relative overflow-hidden group rounded">
                    <Image 
                        src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                        alt={ result.title }
                        width={400}
                        height={580}
                        loading="lazy"
                    />
                    <span className="block absolute right-0 rounded-bl-lg border-gray-500 shadow-md rounded-tr-sm text-sm top-0 w-10 text-center font-bold py-0.5 lg:bg-gray-900 bg-gray-800 text-yellow-500">{result.vote_average}</span>
                    <span className="absolute left-0 py-0.5 px-1 truncate text-gray-500 rounded-tr-lg bottom-11 text-xs lg:bg-gray-900 bg-gray-800 w-16 text-center">
                        {language[0].name}
                    </span>
                    <div className="absolute left-0 right-0 -bottom-0 px-1 py-1 lg:bg-gray-900 bg-gray-800 text-white">
                        <span className="truncate text-sm block -mb-2 text-white group-hover:underline">{result.title || result.original_title || result.name || result.original_name}</span>
                        <span style={{ fontSize: '.6rem' }} className="text-gray-500 italic leading-3"><DateStr date={result.release_date || result.first_air_date} /></span>
                    </div>
                </div>
            </li>
        </Link>
    )
}


export default Tab