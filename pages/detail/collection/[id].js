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
            <div className="hidden sm:block">
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
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-hidden mt-4">
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
    const res = await fetch(`https://api.themoviedb.org/3/collection/${id}?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const collection = await res.json()
    return {
        props: {
            collection
        }
    }
}

export default Collection