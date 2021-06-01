import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react"

function SeasonDetail({ tvSeason, tvDetail }) {  
    console.log(tvSeason);
    return (
        <Fragment>
            <Head>
                <title>{tvDetail.name || tvDetail.original_name} Session {tvSeason.name}</title>
                <meta name="description" content={tvSeason.overview} />
                <meta property="og:title" id="titleOg" content={ tvDetail.name || tvDetail.original_name + " Session " + tvSeason.name + " | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ tvSeason.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${tvSeason.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <div className="px-3">
                <div className="grid grid-cols-2 md:grid-cols-8 gap-3">
                    {tvSeason.episodes.map((episode, key) => {
                        return (
                            <div className="bg-gray-800 bg-opacity-50 rounded" key={key}>
                                <Image 
                                    src={episode.still_path !== null ? `https://image.tmdb.org/t/p/original${episode.still_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                    alt={episode.name || episode.original_name}
                                    width={500}
                                    height={670}
                                    className="rounded"
                                />

                            </div>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {  
    const { season_number, tv_id } = context.query

    const api = await fetch(`https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const tvSeason = await api.json()

    const api2 = await fetch(`https://api.themoviedb.org/3/tv/${tv_id}?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const tvDetail = await api2.json()

    return {
        props: {
            tvSeason,
            tvDetail
        }
    }
}



export default SeasonDetail