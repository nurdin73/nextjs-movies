import Head from "next/head";
import { Fragment } from "react";

function EpisodeDetail({ tvEpisode }) {  
    return (
        <Fragment>
            <Head>
                <title>{tvEpisode.name} | LUX movie rating</title>
                <meta name="description" content={tvEpisode.overview} />
                <meta property="og:title" id="titleOg" content={ tvEpisode.name + " | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ tvEpisode.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${tvEpisode.still_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <h1>{ tvEpisode.name }</h1>
        </Fragment>
    )
}

export async function getServerSideProps(context) {  
    const { season_number, tv_id, episode_number } = context.query
    const api = await fetch(`https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}/episode/${episode_number}?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const tvEpisode = await api.json()

    return {
        props: {
            tvEpisode
        }
    }
}

export default EpisodeDetail