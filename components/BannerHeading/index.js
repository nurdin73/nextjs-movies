import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

function BannerHeading({id_ = "", poster, title, tagline, release_date, media_type = "movie", urlPage = "" }) {
    const releaseDate = release_date !== null ? release_date.split('-')[0] : ""
    return (
        <div className="bg-gray-900 bg-opacity-70 h-28 flex items-center">
            <div className="md:container md:mx-auto mx-3 flex items-center space-x-3 px-3">
                <Image 
                    src={`https://image.tmdb.org/t/p/w500${poster}`}
                    alt={title}
                    width={70}
                    height={90}
                    className="block rounded"
                />
                <div>
                    <div className="flex justify-start md:items-center md:flex-row flex-col md:space-x-1 md:text-3xl text-lg">
                        <Link href={urlPage}>
                            <h1 className="text-yellow-500 cursor-pointer hover:text-opacity-60 transition duration-300">{title}</h1>
                        </Link>
                        <span className="text-gray-700 text-sm md:text-3xl">({releaseDate})</span>
                    </div>
                    {media_type === "season" ? 
                        <Link href={`/detail/tv/${id_}/seasons`}>
                            <div className="flex items-center justify-start space-x-2 cursor-pointer hover:text-opacity-40">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 text-opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="italic text-gray-500 text-opacity-70 text-xs md:text-sm">Back to season list</span>
                            </div>
                        </Link>
                        :
                        <span className="italic text-gray-500 text-opacity-70 text-xs md:text-sm">{tagline}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerHeading