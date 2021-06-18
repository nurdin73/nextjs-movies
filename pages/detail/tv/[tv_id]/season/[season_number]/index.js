import Head from "next/head";
import Image from "next/image";
import DateStr from "../../../../../../components/DateStr";
import { Fragment, useState } from "react"
import { useRouter } from 'next/router'
import { Transition, Dialog } from "@headlessui/react";
import BannerHeading from "../../../../../../components/BannerHeading";

function SeasonDetail({ tvSeason, tvDetail }) {  
    const router = useRouter()
    const { season_number, tv_id } = router.query
    const [modal, setModal] = useState(false)
    const [data, setData] = useState(null)

    const openModal = (episode_number) => () => {
        setModal(true)
        async function getData(url = "") {
            const res = await fetch(url)
            const response = await res.json()
            setData(response)
        }
        getData(`https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}/episode/${episode_number}?api_key=f52aa1a7c260685a467d566a4b94825f`)
    }

    const closeModal = () => {
        setModal(false)
    }

    return (
        <Fragment>
            <Head>
                <title>{tvDetail.name || tvDetail.original_name} {tvSeason.name}</title>
                <meta name="description" content={tvSeason.overview} />
                <meta property="og:title" id="titleOg" content={ tvDetail.name || tvDetail.original_name + " " + tvSeason.name + " | LUX movie rating" } />
                <meta property="og:description" id="descOg" content={ tvSeason.overview } />
                <meta property="og:site_name" content="LUX | online movie ratings" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${tvSeason.poster_path}`} />
                <meta property="og:image:width" content="245" />
                <meta property="og:image:height" content="71" />
            </Head>
            <BannerHeading 
                tagline={tvDetail.tagline}
                id_={tvDetail.id}
                media_type="season"
                poster={tvSeason.poster_path}
                release_date={tvSeason.air_date}
                title={tvSeason.name || tvSeason.original_name}
                urlPage={`/detail/tv/${tv_id}/season/${season_number}`}
            />
            <div className="px-3 md:container md:mx-auto pt-3 pb-3">
                <h3 className="text-yellow-500 md:text-lg">Episode <span className="text-gray-500">[{tvSeason.episodes.length}]</span></h3>
                <ul className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2">
                    {tvSeason.episodes.map((episode, key) => {
                        return (
                            <button
                                onClick={openModal(episode.episode_number)}
                                key={key}
                                className="focus:outline-none"
                            >
                                <li className="cursor-pointer shadow-sm">
                                    <div className="relative overflow-hidden group rounded">
                                        <Image 
                                            src={episode.still_path !== null ? `https://image.tmdb.org/t/p/original${episode.still_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                            alt={episode.name || episode.original_name}
                                            width={640}
                                            height={360}
                                            className="rounded"
                                            loading="lazy"
                                        />
                                        <span className="block absolute right-0 rounded-bl-lg border-gray-500 shadow-md rounded-tr-sm text-sm top-0 w-10 text-center font-bold py-0.5 lg:bg-gray-900 bg-gray-800 text-gray-400">{episode.vote_average.toFixed(1)}</span>
                                        <div className="absolute left-0 right-0 -bottom-0 px-1 py-1 lg:bg-gray-900 bg-gray-800 text-white">
                                            <span className="truncate text-sm block -mb-2 text-white group-hover:underline">{episode.title || episode.original_title || episode.name || episode.original_name} | episode {episode.episode_number}</span>
                                            <span style={{ fontSize: '.6rem' }} className="text-gray-500 italic leading-3"><DateStr date={episode.air_date} /></span>
                                        </div>
                                    </div>
                                </li>
                            </button>
                        )
                    })}
                </ul>
            </div>

            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-2xl border-2 border-gray-600 md:border-none rounded-md">
                                <div className="flex justify-between items-center">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-500">{ data !== null && data.name } | {tvDetail.name} Episode {data !== null && data.episode_number}</Dialog.Title>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center text-sm font-medium text-yellow-500 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-2 relative">
                                    <Image 
                                        src={data !== null ? `https://image.tmdb.org/t/p/original${data.still_path}` : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"}
                                        alt={data !== null && data.name}
                                        width={640}
                                        height={360}
                                        className="rounded"
                                        loading="lazy"
                                    />
                                    <span className="block absolute right-0 rounded-bl-lg border-gray-500 shadow-md rounded-tr-sm text-sm top-0 w-16 text-center font-bold py-1.5 lg:bg-gray-900 bg-gray-800 text-gray-400">{data !== null && data.vote_average.toFixed(1)}</span>
                                </div>
                                <div className="mt-2">
                                    <span className="block text-yellow-500 text-sm">Release date</span>
                                    <span className="text-sm text-gray-500"><DateStr date={data !== null && data.air_date} /></span>
                                </div>
                                <div className="mt-2">
                                    <span className="block text-yellow-500 text-sm">Overview</span>
                                    <span className="text-sm text-gray-500">{data !== null && data.overview}</span>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
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