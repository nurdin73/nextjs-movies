import Head from "next/head"
import { useRouter } from "next/router"
import { forwardRef, Fragment } from "react"

const PersonDetail = forwardRef(({personDetail}, ref) => {
    const router = useRouter()
    const namePerson = router.query.person_id.split('-')[1]
    
    return (
        <Fragment ref={ref}>
            <Head>
                <title>Person detail {namePerson}</title>
            </Head>
            <div className="container mx-auto">
                
            </div>
        </Fragment>
    )
})

export async function getServerSideProps(context) {
    const { person_id } = context.query
    const personId = person_id.split('-')[0]
    const res = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=f52aa1a7c260685a467d566a4b94825f&language=en-US&append_to_response=credits`)
    const personDetail = await res.json()

    return {
        props : {
            personDetail
        }
    }
}

export default PersonDetail