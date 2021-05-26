import { Fragment } from "react"
import Image from 'next/image'
import Link from "next/link"

export default function EachData({ data, title }) {
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
            <h2 className="text-yellow-500 text-bold text-2xl">{ title }</h2>
            <hr className="my-2" />
            <div className="grid grid-cols-7 gap-4">
            {data.results.map((result, key) => {
                if(key < 7) {
                    return (
                        <Link key={key} href={`/detail/movie/${result.id}`}>
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
            })}
            </div>
        </Fragment>
    )
}