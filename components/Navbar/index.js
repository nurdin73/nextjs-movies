import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import slugify from 'slugify'
function Navbar() { 
    const router = useRouter()

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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.push(`/search/${searchVal}`)
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
            <div className="md:container md:mx-auto md:px-3 xl:px-0 flex justify-center flex-col md:flex-row items-center md:justify-between space-y-1 md:space-y-0 md:space-x-2">
                <Link href="/">
                    <span className="cursor-pointer text-yellow-500 text-3xl font-bold items-center flex hover:text-opacity-70 transition duration-200 lg:order-1">LUX</span>
                </Link>
                <div className="w-3/4 md:w-1/2 block relative lg:order-2 order-3">
                    <form className="relative" onSubmit={handleSearchSubmit}>
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
                <div className="flex items-center space-x-3 lg:order-3 order-2">
                    <Menu as="div" className="relative">
                        <Menu.Button className="text-yellow-500 focus:outline-none focus:text-yellow-700 hover:text-yellow-700 transition duration-200 cursor-pointer">
                            TV Show
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute md:left-0 lg:right-0 w-52 mt-2 z-10 origin-top-right bg-gray-900 divide-y divide-gray-100 shadow-lg focus:outline-none rounded">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/tv/popular`}>
                                                <button
                                                    className={`${
                                                    active ? 'bg-violet-500 text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    Popular
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/tv/airing_today`}>
                                                <button
                                                    className={`${
                                                    active ? 'bg-violet-500 text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    Airing Today
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/tv/on_the_air`}>
                                                <button
                                                    className={`${
                                                    active ? 'bg-violet-500 text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    On TV
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/tv/top_rated`}>
                                                <button
                                                    className={`${
                                                    active ? 'bg-violet-500 text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    Top Rated
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <Menu as="div" className="relative">
                        <Menu.Button className="text-yellow-500 focus:outline-none focus:text-yellow-700 hover:text-yellow-700 transition duration-200 cursor-pointer">
                            Movie
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute lg:right-0 -left-24 w-52 mt-2 z-10 origin-top-right bg-gray-900 divide-y divide-gray-100 shadow-lg focus:outline-none rounded">
                            <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/movie/popular`}>
                                                <button
                                                    className={`${
                                                    active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    Popular
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/movie/now_playing`}>
                                                <button
                                                    className={`${
                                                    active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    Now Playing
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/movie/upcoming`}>
                                                <button
                                                    className={`${
                                                    active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    Upcoming
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/movie/top_rated`}>
                                                <button
                                                    className={`${
                                                    active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    Top Rated
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Menu as="div" className="relative">
                        <Menu.Button className="text-yellow-500 focus:outline-none focus:text-yellow-700 hover:text-yellow-700 transition duration-200 cursor-pointer">
                            People
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 w-52 mt-2 z-10 origin-top-right bg-gray-900 divide-y divide-gray-100 shadow-lg focus:outline-none rounded">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/person/popular`}>
                                                <button
                                                    className={`${
                                                    active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                    } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                >
                                                    Popular
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar