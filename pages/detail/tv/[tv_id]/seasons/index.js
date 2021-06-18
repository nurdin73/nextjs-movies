import { Fragment } from "react"
import slugify from "slugify"
import BannerHeading from "../../../../../components/BannerHeading"
import Card from "../../../../../components/Card"
function Seasons({ tvSeason }) {
    return (
        <Fragment>
            <BannerHeading 
                poster={tvSeason.poster_path}
                title={tvSeason.name || tvSeason.original_name}
                urlPage={`/detail/tv/${tvSeason.id}-${slugify(tvSeason.name || tvSeason.original_name, {lower: true})}`}
                release_date={tvSeason.first_air_date}
                tagline={tvSeason.tagline}
            />
            <div className="px-3 md:container md:mx-auto pt-3 pb-3">
                <ul className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-2">
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
    const api = await fetch(`https://api.themoviedb.org/3/tv/${tv_id}?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const tvSeason = await api.json()

    return {
        props: {
            tvSeason,
        }
    }
}

export default Seasons