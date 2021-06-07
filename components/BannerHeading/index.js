import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

function BannerHeading({id_movie, poster, title, tagline, release_date }) {
    const releaseDate = release_date !== null ? release_date.split('-')[0] : ""
    return (
        <div className="bg-gray-900 bg-opacity-70 h-28 flex items-center">
            <div className="md:container md:mx-auto mx-3 flex items-center space-x-3">
                <Image 
                    src={`https://image.tmdb.org/t/p/w500${poster}`}
                    alt={title}
                    width={70}
                    height={90}
                    className="block rounded"
                />
                <div>
                    <div className="flex justify-start md:items-center md:flex-row flex-col md:space-x-1 md:text-3xl text-lg">
                        <Link href={`/detail/movie/${id_movie}-${slugify(title, {lower: true})}`}>
                            <h1 className="text-yellow-500 cursor-pointer hover:text-opacity-60 transition duration-300">{title}</h1>
                        </Link>
                        <span className="text-gray-700 text-sm md:text-3xl">({releaseDate})</span>
                    </div>
                    <span className="italic text-gray-500 text-opacity-70 text-xs md:text-sm">{tagline}</span>
                </div>
            </div>
        </div>
    )
}

export default BannerHeading