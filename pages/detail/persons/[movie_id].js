import { Fragment } from "react";

function ListPersonByMovie({getListCredits}) {
    return (
        <Fragment>
            <h1>tdas</h1>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const { movie_id } = context.query

    const credits = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=f52aa1a7c260685a467d566a4b94825f`)
    const getListCredits = await credits.json()

    return {
        props: {
            getListCredits
        }
    }
}

export default ListPersonByMovie