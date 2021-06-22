import { Fragment } from "react"
import Head from "next/head"
import Image from "next/image"
import Card from '../../../components/Card'
import slugify from "slugify"
function Collection({ collection }) {
    return (
        <Fragment>
            <Head>
                <title>{collection.name || collection.title} | LUX movie rating</title>
                <meta name="description" content={collection.overview} />
                <meta property="og:title" id="titleOg" content={ collection.title || collection.name + " | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ collection.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${collection.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <div className="hidden md:block">
                <div className="min-h-full md:bg-cover md:bg-no-repeat md:bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${collection.backdrop_path})` }}>
                    <div className="bg-gray-900 bg-opacity-90 bg-cover min-h-full">
                        <div className="container mx-auto py-8 px-4">
                            <div className="grid md:grid-cols-12 justify-center gap-4 items-center">
                                <div className="col-span-5 justify-center md:col-span-3 bg-cover bg-center min-h-full relative">
                                    <Image 
                                        src={`https://image.tmdb.org/t/p/original${collection.poster_path}`}
                                        alt={collection.name}
                                        width={300}
                                        height={420}
                                        className="block rounded"
                                    />
                                    <span className="absolute left-3 top-3 bg-yellow-500 px-3 py-0 text-lg rounded">{collection.vote_average}</span>
                                </div>
                                <div className="col-span-9">
                                    <h1 className="text-4xl text-yellow-500 text-bold">
                                        {collection.name}
                                    </h1>
                                    <span className="block py-1 text-lg text-white font-bold">Overview</span>
                                    <span className="block text-sm text-white text-opacity-80 font-light">{collection.overview}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="mx-3 xl:container xl:mx-auto px-4 pt-2 pb-3">
                    <h2 className="mt-2 text-yellow-500 text-lg">Parts</h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-hidden mt-4">
                        {collection.parts.map((part, key) => {
                            return (
                                <Card key={key} result={part} link={`/detail/movie/${part.id}-${slugify(part.title || part.name || part.original_name || part.original_title, {lower: true})}`} imgHeight={580} imgWidth={400} type="movie" />
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="block md:hidden">
                <div className="h-96 min-h-full bg-cover bg-no-repeat bg-top relative" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${collection.poster_path})` }}>
                    <div className="h-28 bg-gradient-to-t from-gray-900 absolute left-0 right-0 -bottom-1"></div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mt-2 text-yellow-500 text-lg">{collection.title || collection.original_title || collection.original_name || collection.name}</h2>
                    <span className="text-gray-500 text-sm text-justify block">{collection.overview}</span>
                    <h2 className="mt-2 text-gray-500 text-lg">Parts</h2>
                    <ul className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-hidden mt-4">
                        {collection.parts.map((part, key) => {
                            return (
                                <Card key={key} result={part} link={`/detail/movie/${part.id}-${slugify(part.title || part.name || part.original_name || part.original_title, {lower: true})}`} imgHeight={580} imgWidth={400} type="movie" />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const {id} = context.query
    const res = await fetch(`https://api.themoviedb.org/3/collection/${id}?api_key=${process.env.API_KEY}`)
    const collection = await res.json()
    return {
        props: {
            collection
        }
    }
}

export default Collection