import { Fragment, useState } from "react"
import Image from "next/image"
function Media({ videos, backdrops, posters }) {
    const [mediaView, setMediaView] = useState('videos')

    const handleClickMedia = (media = "videos") => () => {
        setMediaView(media)
    }

    return (
        <Fragment>
            <div className="flex justify-between items-center mt-3">
                <span className="block text-lg py-1 md:text-yellow-500 text-gray-500">Media</span>
                <ul className="flex items-center justify-end space-x-2">
                    <li onClick={handleClickMedia('videos')} className={`${mediaView === "videos" ? 'bg-yellow-800' : "lg:bg-gray-900 bg-gray-800"} lg:px-4 py-0.5 px-2 shadow-sm rounded-2xl text-gray-300 hover:bg-yellow-800 transition duration-200 cursor-pointer text-xs lg:text-lg`}>Videos</li>
                    <li onClick={handleClickMedia('backdrops')} className={`${mediaView === "backdrops" ? 'bg-yellow-800' : "lg:bg-gray-900 bg-gray-800"} lg:px-4 py-0.5 px-2 shadow-sm rounded-2xl text-gray-300 hover:bg-yellow-800 transition duration-200 cursor-pointer text-xs lg:text-lg`}>Backdrops</li>
                    <li onClick={handleClickMedia('posters')} className={`${mediaView === "posters" ? 'bg-yellow-800' : "lg:bg-gray-900 bg-gray-800"} lg:px-4 py-0.5 px-2 shadow-sm rounded-2xl text-gray-300 hover:bg-yellow-800 transition duration-200 cursor-pointer text-xs lg:text-lg`}>Posters</li>
                </ul>
            </div>
            <ul className="md:mt-3 mt-1">
                {mediaView === "videos" ? 
                <li>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {videos.results !== null && videos.results.map((video, key) => {
                            if(key < 4) {
                                return (
                                    <li className="aspect-w-3 aspect-h-2" key={key}>
                                        <iframe className="object-cover rounded" src={`https://www.youtube.com/embed/${video.key}`} title={video.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
        </Fragment>
    )
}

export default Media