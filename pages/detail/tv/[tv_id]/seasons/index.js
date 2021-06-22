import { Fragment } from "react"
import slugify from "slugify"
import Head from 'next/head'
import BannerHeading from "../../../../../components/BannerHeading"
import Card from "../../../../../components/Card"
function Seasons({ tvSeason }) {
    return (
        <Fragment>
            <Head>
                <title>{tvSeason.name || tvSeason.original_name} seasons list | LUX movie rating</title>
                <meta name="description" content={tvSeason.overview} />
                <meta property="og:title" id="titleOg" content={ tvSeason.name || tvSeason.original_name + " seasons list | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ tvSeason.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${tvSeason.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <BannerHeading 
                poster={tvSeason.poster_path}
                title={tvSeason.name || tvSeason.original_name}
                urlPage={`/detail/tv/${tvSeason.id}-${slugify(tvSeason.name || tvSeason.original_name, {lower: true})}`}
                release_date={tvSeason.first_air_date}
                tagline={tvSeason.tagline}
            />
            <div className="px-3 md:container md:mx-auto pt-3 pb-3">
                <ul className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-2">
                    {tvSeason.seasons.map((season, key) => {
                        return (
                            <Card 
                                result={season}
                                link={`/detail/tv/${tvSeason.id}/season/${season.season_number}`}
                                type="tv"
                                imgHeight={580}
                                imgWidth={400}
                            />
                        )
                    })}
                </ul>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {  
    const { tv_id } = context.query
    const api = await fetch(`https://api.themoviedb.org/3/tv/${tv_id}?api_key=${process.env.API_KEY}`)
    const tvSeason = await api.json()

    return {
        props: {
            tvSeason,
        }
    }
}

export default Seasons