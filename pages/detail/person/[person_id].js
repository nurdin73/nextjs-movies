import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { forwardRef, Fragment, useState } from "react"
import slugify from "slugify"

const PersonDetail = forwardRef(({personDetail}, ref) => {
    const router = useRouter()

    const [readMore, setReadMore] = useState(false)

    const handleReadMore = () => {
        if(readMore === true) {
            setReadMore(false)
        } else {
            setReadMore(true)
        }
    }
    
    // getting name from url
    const splitStr = router.query.person_id.split('-')
    splitStr.shift()
    const namePerson = splitStr.join(' ')

    // filtering know for
    var filterKnowFor = personDetail.known_for_department === "Acting" ? 
        personDetail.credits.cast.filter((cast, i) => {
            if(cast.vote_average >= 6) {
                return cast
            }
        })
    : personDetail.credits.crew.filter((crew, i) => {
        if(crew.vote_average >= 6) {
            return crew.department == personDetail.known_for_department
        }
    })

    filterKnowFor = filterKnowFor.filter((crew, i) => {
        const thisCrew = JSON.stringify(crew.title)
        return i === filterKnowFor.findIndex(obj => {
            return JSON.stringify(obj.title) === thisCrew
        })
    })


    
    // get age
    const splitDate = personDetail.birthday !== null ? personDetail.birthday.split('-') : null
    const diff_ms = splitDate !== null ? Date.now() - new Date(splitDate[0], splitDate[1], splitDate[2]) : null
    const ageDate = diff_ms !== null ? new Date(diff_ms) : null

    const getAge = ageDate !== null ? `(${Math.abs(ageDate.getUTCFullYear() - 1970)} Years ago)` : ""

    // filtering departement
    var filterGettingDepartement = personDetail.credits.crew.map(crew => {
        return crew.department
    })

    const countingTotalData = () => {
        filterGettingDepartement.sort()
        const temp = []
        var current = null;
        var cnt = 0;
        for (var i = 0; i < filterGettingDepartement.length; i++) {
            if (filterGettingDepartement[i] != current) {
                if(cnt > 0) {
                    temp.push({
                        departement: current,
                        count: cnt
                    })
                }
                current = filterGettingDepartement[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if(cnt > 0) {
            temp.push({
                departement: current,
                count: cnt
            })
        }

        return temp
    }

    filterGettingDepartement = filterGettingDepartement.filter((v, i) => filterGettingDepartement.indexOf(v) === i) 

    return (
        <Fragment ref={ref}>
            <Head>
                <title>Person detail {namePerson}</title>
                <meta name="description" content={personDetail.biography} />
                <meta property="og:title" id="titleOg" content={ personDetail.name + " | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ personDetail.biography } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${personDetail.profile_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <div className="md:container md:mx-auto py-5 mx-4 md:block hidden">
                <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-3 col-span-5">
                        <Image 
                            src={`https://image.tmdb.org/t/p/original${personDetail.profile_path}`}
                            alt={personDetail.name}
                            width={300}
                            height={420}
                            className="block rounded mb-4"
                        />
                        <span className="block text-lg text-white font-bold mb-2">Personal Info</span>
                        <ul className="list-none flex flex-col items-start justify-start space-y-2">
                            <li className="flex flex-col items-start justify-start">
                                <span className="font-bold text-white text-md">Know for</span>
                                <span className="font-thin text-white text-sm text-opacity-70">{personDetail.known_for_department}</span>
                            </li>
                            <li className="flex flex-col items-start justify-start">
                                <span className="font-bold text-white text-md">Gender</span>
                                <span className="font-thin text-white text-sm text-opacity-70">{personDetail.gender == 1 ? "Female" : (personDetail.gender == 2 ? "Male": "")}</span>
                            </li>
                            <li className="flex flex-col items-start justify-start">
                                <span className="font-bold text-white text-md">Birthday</span>
                                <span className="font-thin text-white text-sm text-opacity-70">{personDetail.birthday}{getAge}</span>
                            </li>
                            <li className="flex flex-col items-start justify-start">
                                <span className="font-bold text-white text-md">Place of birth</span>
                                <span className="font-thin text-white text-sm text-opacity-70">{personDetail.place_of_birth}</span>
                            </li>
                            <li className="flex flex-col items-start justify-start">
                                <span className="font-bold text-white text-md">Also known as</span>
                                <ul>
                                    {personDetail.also_known_as.map((knowas, key) => {
                                        return <li className="text-white font-thin text-sm text-opacity-70" key={key}>{knowas}</li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-7">
                        <h1 className="text-3xl font-bold text-yellow-500 mb-3">{personDetail.name}</h1>
                        <span className="block text-lg text-white font-bold mb-2">Biography</span>
                        <span className={`block italic text-sm font-thin text-white`}>
                            <span className={`${readMore === false ? 'truncate' : ""} block`}>{personDetail.biography}</span>
                            <small onClick={handleReadMore} className="text-yellow-500 cursor-pointer underline">{ readMore === true ? "hide bio" : "readmore bio" }</small>
                        </span>
                        {/* <span className="block italic text-sm font-thin text-white">{personDetail.biography}</span> */}
                        <span className="block text-lg text-white font-bold my-2">Know for</span>
                        <ul className="grid grid-cols-7 gap-4 list-none">
                            {filterKnowFor.map((knowfor, key) => {
                                if(key < 7) {
                                    return (
                                        <li key={key}>
                                            <Link href={`/detail/movie/${knowfor.id}-${slugify(knowfor.title, {
                                                lower: true
                                            })}`}>
                                                <div className="cursor-pointer group">
                                                    <Image 
                                                        src={`https://image.tmdb.org/t/p/original${knowfor.poster_path}`}
                                                        alt={ knowfor.title || knowfor.original_title }
                                                        width={400}
                                                        height={580}
                                                        className="rounded"
                                                    />
                                                    <span className="truncate text-sm block text-white group-hover:underline">{knowfor.title}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                        <ul className="mt-3 flex flex-col space-y-4">
                            <li key={'actor'} className="block bg-gray-800 px-4 py-2 text-white rounded">
                                <span className="block text-yellow-500 text-lg text-bold">Acting</span>
                                <ul className="flex flex-col space-y-2 mt-3">
                                    {personDetail.credits.cast.map((joblist, x) => {
                                        return (
                                            <li key={x} className="text-sm flex items-center justify-start space-x-1">
                                                <span>{joblist.release_date !== "" && joblist.release_date !== undefined ? joblist.release_date.split('-')[0] : "-"}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                </svg>
                                                <Link href={`/detail/movie/${joblist.id}-${slugify(joblist.title || joblist.original_title, {
                                                    lower: true
                                                })}`}>
                                                    <span className="cursor-pointer truncate hover:text-yellow-800 hover:underline transition duration-300">{joblist.title || joblist.original_title}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            {filterGettingDepartement.map((department, i) => {
                                return (
                                    <li key={i} className="block bg-gray-800 px-4 py-2 text-white rounded">
                                        <span className="block text-yellow-500 text-lg text-bold">{department}</span>
                                        <ul className="flex flex-col space-y-2 mt-3">
                                            {personDetail.credits.crew.map((joblist, x) => {
                                                if(joblist.department === department) {
                                                    return (
                                                        <li key={x} className="text-sm flex items-center justify-start space-x-1">
                                                            <span>{joblist.release_date !== "" && joblist.release_date !== undefined ? joblist.release_date.split('-')[0] : "-"}</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                            </svg>
                                                            <Link href={`/detail/movie/${joblist.id}-${slugify(joblist.title || joblist.original_title, {
                                                                lower: true
                                                            })}`}>
                                                                <span className="cursor-pointer truncate hover:text-yellow-800 hover:underline transition duration-300">{joblist.title || joblist.original_title}</span>
                                                            </Link>
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="md:hidden block mx-4 py-4">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-5">
                        <Image 
                            src={`https://image.tmdb.org/t/p/original${personDetail.profile_path}`}
                            alt={personDetail.name}
                            width={300}
                            height={420}
                            className="block rounded mb-4"
                        />
                    </div>
                    <div className="col-span-7">
                        <h2 className="text-lg text-yellow-500">{personDetail.name || personDetail.original_name}</h2>
            
                        <div className="flex flex-col -space-y-0.5 justify-start items-start mt-1">
                            <div className="flex flex-col">
                                <span className="text-gray-500">Gender</span>
                                <small className="text-gray-600 text-opacity-70">{personDetail.gender == 1 ? "Female" : (personDetail.gender == 2 ? "Male": "")}</small>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Birthday</span>
                                <small className="text-gray-600 text-opacity-70">{personDetail.birthday}{getAge}</small>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Place of birth</span>
                                <small className="text-gray-600 text-opacity-70">{personDetail.place_of_birth}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="block text-gray-500">Also know as</span>
                <ul>
                    {personDetail.also_known_as.map((knowas, key) => {
                        return <li className="text-gray-500 font-thin text-sm text-opacity-70" key={key}>{knowas}</li>
                    })}
                </ul>
                <span className="block text-gray-500">Biography</span>
                <span className={`text-gray-600 text-opacity-70 text-justify text-sm`}>
                    <span className={`${readMore === false ? 'truncate' : ""} block`}>{personDetail.biography}</span>
                    <small onClick={handleReadMore} className="text-yellow-500 underline">{ readMore === true ? "hide bio" : "readmore bio" }</small>
                </span>
                <span className="block text-gray-500">Know for</span>
                <div className="grid grid-cols-3 gap-3">
                    {filterKnowFor.map((knowfor, i) => {
                        if(i < 3) {
                            return (
                                <Link key={i} href={`/detail/movie/${knowfor.id}-${slugify(knowfor.title, {lower: true})}`}>
                                    <div className="group cursor-pointer">
                                        <Image 
                                            src={ knowfor.poster_path !== null ? `https://image.tmdb.org/t/p/original${knowfor.poster_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                            alt={knowfor.title || knowfor.original_title}
                                            width={300}
                                            height={420}
                                            className="rounded mb-0"
                                        />
                                    </div>
                                </Link>
                            )
                        }
                    })}
                </div>
                <ul className="mt-3 flex flex-col space-y-4">
                    <li key={'actor'} className="block bg-gray-800 bg-opacity-50 px-4 py-2 text-white rounded">
                        <span className="block text-yellow-500 text-lg text-bold">Acting</span>
                        <ul className="flex flex-col space-y-2 mt-3">
                            {personDetail.credits.cast.map((joblist, x) => {
                                return (
                                    <li key={x} className="text-sm flex items-center justify-start space-x-1">
                                        <span>{joblist.release_date !== "" && joblist.release_date !== undefined ? joblist.release_date.split('-')[0] : "-"}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                        </svg>
                                        <Link href={`/detail/movie/${joblist.id}-${slugify(joblist.title || joblist.original_title, {
                                            lower: true
                                        })}`}>
                                            <span className="cursor-pointer truncate hover:text-yellow-800 hover:underline transition duration-300">{joblist.title || joblist.original_title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                    {filterGettingDepartement.map((department, i) => {
                        return (
                            <li key={i} className="block bg-gray-800 bg-opacity-50 px-4 py-2 text-white rounded">
                                <span className="block text-yellow-500 text-lg text-bold">{department}</span>
                                <ul className="flex flex-col space-y-2 mt-3">
                                    {personDetail.credits.crew.map((joblist, x) => {
                                        if(joblist.department === department) {
                                            return (
                                                <li key={x} className="text-sm flex items-center justify-start space-x-1">
                                                    <span>{joblist.release_date !== "" && joblist.release_date !== undefined ? joblist.release_date.split('-')[0] : "-"}</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                    </svg>
                                                    <Link href={`/detail/movie/${joblist.id}-${slugify(joblist.title || joblist.original_title, {
                                                        lower: true
                                                    })}`}>
                                                        <span className="cursor-pointer truncate hover:text-yellow-800 hover:underline transition duration-300">{joblist.title || joblist.original_title}</span>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
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