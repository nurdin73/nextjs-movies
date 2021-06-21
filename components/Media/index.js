import { Fragment, useState } from "react"
import Image from "next/image"
import { Transition, Dialog } from "@headlessui/react"
function Media({ videos, backdrops, posters }) {
    const [mediaView, setMediaView] = useState('videos')
    const [openModalThumb, setOpenModalThumb] = useState(false)
    const [dataModal, setDataModal] = useState(null)

    const handleClickMedia = (media = "videos") => () => {
        setMediaView(media)
    }

    const handleOpenThumbnail = (videoKey = "", videoName = "") => () => {
        setOpenModalThumb(true)
        setDataModal({
            key: videoKey,
            name: videoName
        })
    }

    const closeModal = () => {
        setOpenModalThumb(false)
    }

    return (
        <Fragment>
            <div className="flex justify-between items-center mt-3">
                <span className="block text-lg py-1 md:text-yellow-500 text-gray-500">Media</span>
                <ul className="flex items-center justify-end space-x-2">
                    <li onClick={handleClickMedia('videos')} className={`${mediaView === "videos" ? 'bg-yellow-800' : "lg:bg-gray-900 bg-gray-800"} lg:px-4 py-0.5 px-2 shadow-sm rounded-2xl text-gray-300 hover:bg-yellow-800 transition duration-200 cursor-pointer text-xs lg:text-lg`}>Videos[{videos.results.length}]</li>
                    <li onClick={handleClickMedia('backdrops')} className={`${mediaView === "backdrops" ? 'bg-yellow-800' : "lg:bg-gray-900 bg-gray-800"} lg:px-4 py-0.5 px-2 shadow-sm rounded-2xl text-gray-300 hover:bg-yellow-800 transition duration-200 cursor-pointer text-xs lg:text-lg`}>Backdrops[{backdrops.length}]</li>
                    <li onClick={handleClickMedia('posters')} className={`${mediaView === "posters" ? 'bg-yellow-800' : "lg:bg-gray-900 bg-gray-800"} lg:px-4 py-0.5 px-2 shadow-sm rounded-2xl text-gray-300 hover:bg-yellow-800 transition duration-200 cursor-pointer text-xs lg:text-lg`}>Posters[{posters.length}]</li>
                </ul>
            </div>
            <ul className="md:mt-3 mt-1">
                {mediaView === "videos" ? 
                <li>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {videos.results !== null && videos.results.map((video, key) => {
                            if(key < 4) {
                                return (
                                    <li className="relative" key={key}>
                                        <Image 
                                            className="object-cover rounded"
                                            src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                                            width={480}
                                            height={360}
                                            alt={video.name}
                                        />
                                        <button onClick={handleOpenThumbnail(video.key, video.name)} className="focus:outline-none absolute z-10 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 text-black text-opacity-80 hover:text-opacity-90 transition duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        {/* <iframe className="object-cover rounded" src={`https://www.youtube.com/embed/${video.key}`} title={video.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                                    </li>
                                ) 
                            }
                        })}
                    </ul>    
                </li> : ""}
                {mediaView === "backdrops" ? 
                <li>
                    <ul className="grid lg:grid-cols-2 gap-4">
                        {backdrops !== null && backdrops.map((backdrop, key) => {
                            if(key < 4) {
                                return (
                                    <li key={key} className="relative h-40 md:h-64">
                                        <div className="h-full relative overflow-hidden rounded">
                                            <div className="h-full relative p-0 m-0">
                                                <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                                                    <div className="relative overflow-hidden bg-gradient-to-r from-black to-transparent">
                                                        <Image 
                                                            src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                                                            className="w-full h-full object-cover rounded-md lg:rounded-none"
                                                            loading="lazy"
                                                            width={backdrop.width}
                                                            height={backdrop.height}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ) 
                            }
                        })}
                    </ul>    
                </li> : ""}
                {mediaView === "posters" ? 
                <li>
                    <ul className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                        {posters !== null && posters.map((poster, key) => {
                            if(key < 4) {
                                return (
                                    <li key={key} className="relative h-56 md:h-80">
                                        <div className="h-full relative overflow-hidden rounded">
                                            <div className="h-full relative p-0 m-0">
                                                <div className="absolute top-0 bottom-0 left-0 right-0 w-full transition duration-300 overflow-hidden">
                                                    <div className="relative overflow-hidden bg-gradient-to-r from-black to-transparent">
                                                        <Image 
                                                            src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                                                            className="w-full h-full object-cover rounded-md lg:rounded-none"
                                                            loading="lazy"
                                                            width={poster.width}
                                                            height={poster.height}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ) 
                            }
                        })}
                    </ul>     
                </li> : ""}
            </ul>

            <Transition appear show={openModalThumb} as={Fragment}>
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
                            <div className="inline-block w-full max-w-3xl p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-2xl border-2 border-gray-600 md:border-none rounded-md">
                                <div className="flex justify-between items-center">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-500">{ dataModal !== null && dataModal.name }</Dialog.Title>
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
                                <iframe className="object-cover w-full md:h-96 mt-3 rounded" src={`https://www.youtube.com/embed/${dataModal !== null && dataModal.key}`} title={dataModal !== null && dataModal.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    )
}

export default Media