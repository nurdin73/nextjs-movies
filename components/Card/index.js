import Link from "next/link"
import Image from "next/image"
import DateStr from "../DateStr"
function Card({result, link, imgWidth = 640, imgHeight = 360, type = "movie"}) {
    const rating = result.episode_count || result.vote_average.toFixed(1) || result.popularity.toFixed(1)
    return (
        <Link href={link}>
            <li className="cursor-pointer shadow-sm">
                <div className="relative overflow-hidden group rounded">
                    <Image 
                        src={`https://image.tmdb.org/t/p/original${result.still_path || result.poster_path || result.profile_path}`}
                        alt={result.name || result.original_name || result.title || result.original_title}
                        width={imgWidth}
                        height={imgHeight}
                        className="rounded"
                        loading="lazy"
                    />
                    <span className="block absolute right-0 rounded-bl-lg border-gray-500 shadow-md rounded-tr-sm text-sm top-0 min-w-max px-1.5 truncate w-10 text-center font-bold py-0.5 lg:bg-gray-900 bg-gray-800 text-gray-400">{rating}</span>
                    <div className="absolute left-0 right-0 -bottom-0 px-1 py-1 lg:bg-gray-900 bg-gray-800 text-white">
                        <span className="truncate text-sm block -mb-2 text-white group-hover:underline">{result.title || result.original_title || result.name || result.original_name} {type === "episode" ? `| episode ${result.episode_number}` : ""}</span>
                        <span style={{ fontSize: '.6rem' }} className="text-gray-500 italic leading-3"><DateStr date={result.air_date || result.first_air_date || result.release_date} /></span>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default Card