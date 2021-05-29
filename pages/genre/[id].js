import Head from "next/head";
import { useRouter } from "next/router";
import { forwardRef, Fragment } from "react";
import EachData from "../../components/EachData";

const GenreDetail = forwardRef(({movieByGenre}, ref) => {
    const router = useRouter()
    const nameGenre = router.query.id.split('-')[1]
    return (
        <Fragment ref={ref}>
            <Head>
                <title>List movie genre ${nameGenre}</title>
            </Head>
            <div className="px-3 md:px-0 md:container md:mx-auto">
                <EachData data={movieByGenre} total="max" title={`List movie genre ${nameGenre}`} />
                <div className="flex justify-center items-center py-5">
                    <button className="px-5 py-1 rounded bg-yellow-600 block text-lg">Tampilkan lebih banyak</button>
                </div>
            </div>
        </Fragment>
    )
})

export async function getServerSideProps(context) {
    const { id } = context.query
    const idGenre = id.split('-')[0]
    const requestMovieByGenre = await fetch(`https://api.themoviedb.org/3/genre/${idGenre}/movies?api_key=f52aa1a7c260685a467d566a4b94825f`) 
    const movieByGenre = await requestMovieByGenre.json()

    return {
        props : {
            movieByGenre,
        }
    }
}

export default GenreDetail