import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import slugify from 'slugify'
function Navbar() { 

    const [openAutoComplete, setOpenAutoComplete] = useState(false)
    const [searchData, setSearchData] = useState([])
    const [searchVal, setSearchVal] = useState('')

    const handleKeyUp = (event) => {
        const value = event.target.value
        setSearchVal(value)
        async function requestData() {
            const urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=f52aa1a7c260685a467d566a4b94825f&query=${value}`
            const req = await fetch(urlSearch)
            const search = await req.json()
            setSearchData(search.results)
        }
        if(value.length >= 5) {
            setOpenAutoComplete(true)
            requestData()
        } else {
            setOpenAutoComplete(false)
            setSearchData([])
        }
    }

    const handleClick = () => {
        setOpenAutoComplete(false)
        setSearchData([])
        setSearchVal('')
    }

    const filterSearchTv = searchData.filter(search => {
        return search.media_type === "tv"
    }) 

    const filterSearchMovies = searchData.filter(search => {
        return search.media_type === "movie"
    })

    const filterSearchPeople = searchData.filter(search => {
        return search.media_type === "person"
    })

    return (
        <nav className="bg-gray-900 py-2 md:h-16 md:flex md:items-center">
            <div className="md:container md:mx-auto flex justify-center flex-col md:flex-row items-center md:justify-between space-y-1 md:space-y-0 md:space-x-2">
                <Link href="/">
                    <span className="cursor-pointer text-yellow-500 text-3xl font-bold items-center flex hover:text-opacity-70 transition duration-200">LUX</span>
                </Link>
                <div className="block md:hidden items-center space-x-3">
                    <Link href="#">
                        <span className="text-yellow-500 hover:text-yellow-700 transition duration-200 cursor-pointer">TV show</span>
                    </Link>
                    <Link href="#">
                        <span className="text-yellow-500 hover:text-yellow-700 transition duration-200 cursor-pointer">Movies</span>
                    </Link>
                    <Link href="#">
                        <span className="text-yellow-500 hover:text-yellow-700 transition duration-200 cursor-pointer">People</span>
                    </Link>
                </div>
                <div className="w-3/4 md:w-1/2 block relative">
                    <form className="relative">
                        <input type="text" defaultValue={searchVal} onKeyUp={handleKeyUp} placeholder="Search movie, person, tv show" className={`px-3 py-2 block w-full ${openAutoComplete === true ? 'rounded-t' : 'rounded'} text-yellow-500 bg-gray-800 border-0  outline-none`} />
                        <button type="submit" className="absolute right-2 top-2 outline-none border-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                    <div className={`bg-gray-800 p-3 rounded-b absolute z-10 max-h-56 overflow-y-scroll no-scrollbar ${openAutoComplete === true ? 'block' : 'hidden'} left-0 right-0`}>
                        <ul>
                            {
                                filterSearchTv.length > 0 
                                ?
                                (
                                    <li>
                                        <span className="block text-gray-500">TV Show</span>
                                        <ul className="flex flex-wrap gap-2 mt-2">
                                            {filterSearchTv.map((search, key) => {
                                                return (
                                                    <Link href={`/detail/tv/${search.id}-${slugify(search.name || search.original_name, {lower: true})}`} key={key}>
                                                        <li onClick={handleClick} className="flex-initial text-md text-white text-opacity-50 cursor-pointer hover:bg-opacity-70 transition duration-200 bg-gray-900 px-2 rounded text-center">{search.original_name || search.name}</li>
                                                    </Link>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                ) :
                                ""
                            }

                            {
                                filterSearchMovies.length > 0 
                                ?
                                (
                                    <li>
                                        <span className="block text-gray-500">Movies</span>
                                        <ul className="flex flex-wrap gap-2 mt-2">
                                            {filterSearchMovies.map((search, key) => {
                                                return (
                                                    <Link href={`/detail/movie/${search.id}-${slugify(search.original_title || search.title, { lower: true })}`} key={key}>
                                                        <li onClick={handleClick} className="flex-initial text-md text-white text-opacity-50 cursor-pointer hover:bg-opacity-70 transition duration-200 bg-gray-900 px-2 rounded text-center">{search.original_title || search.title}</li>
                                                    </Link>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                ) :
                                ""
                            }

                            {
                                filterSearchPeople.length > 0 
                                ?
                                (
                                    <li>
                                        <span className="block text-gray-500">People</span>
                                        <ul className="flex flex-wrap gap-2 mt-2">
                                            {filterSearchPeople.map((search, key) => {
                                                return (
                                                    <Link href={`/detail/person/${search.id}-${slugify(search.name, { lower: true })}`} key={key}>
                                                        <li onClick={handleClick} className="flex-initial text-md text-white text-opacity-50 cursor-pointer hover:bg-opacity-70 transition duration-200 bg-gray-900 px-2 rounded text-center">{search.name}</li>
                                                    </Link>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                ) :
                                ""
                            }
                        </ul>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                    <Link href="#">
                        <span className="text-yellow-500 hover:text-yellow-700 transition duration-200 cursor-pointer">TV show</span>
                    </Link>
                    <Link href="#">
                        <span className="text-yellow-500 hover:text-yellow-700 transition duration-200 cursor-pointer">Movies</span>
                    </Link>
                    <Link href="#">
                        <span className="text-yellow-500 hover:text-yellow-700 transition duration-200 cursor-pointer">People</span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar