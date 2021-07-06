import { Dialog, Menu, Transition } from '@headlessui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import slugify from 'slugify'
import Swal from 'sweetalert2'
function Navbar() { 
    const router = useRouter()

    const refHome = useRef()

    const [openAutoComplete, setOpenAutoComplete] = useState(false)
    const [searchData, setSearchData] = useState([])
    const [searchVal, setSearchVal] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [accountData, setSessionID] = useState(Cookies.get('account') !== undefined ? JSON.parse(Cookies.get('account')) : null)
    const [open, setOpen] = useState(false)
    const openModalLogin = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const handleKeyUp = (event) => {
        const value = event.target.value
        setSearchVal(value)
        async function requestData() {
            const urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${value}`
            const req = await fetch(urlSearch)
            const search = await req.json()
            setSearchData(search.results)
        }
        if(value.length >= 3) {
            setOpenAutoComplete(true)
            requestData()
        } else {
            setOpenAutoComplete(false)
            setSearchData([])
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.replace({
            pathname: `/search/[key]`,
            query: {key: searchVal}
        })
    }

    const handleLogout = async () => {
        const deleteSession = await fetch(`https://api.themoviedb.org/3/authentication/session?api_key=${process.env.API_KEY}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                session_id: Cookies.get('session_id'),
            })
        })
        const result = await deleteSession.json()
        if(result.success !== undefined && result.success) {
            Swal.fire({
                title: 'Success!',
                text: 'Logout success',
                background: 'rgba(17, 24, 39, 1)',
                icon: 'success'
            })
            Cookies.remove('session_id')
            Cookies.remove('account')
            router.reload()
        } else {
            Swal.fire({
                title: 'Error!',
                text: result.status_message,
                background: 'rgba(17, 24, 39, 1)',
                icon: 'error'
            })
        }

    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        async function postData(url = "") {
            const getRequestToken = `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_KEY}`
            const req = await fetch(getRequestToken)
            const reqToken = await req.json()
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    request_token: reqToken.request_token
                })
            })
            const results = await response.json()
            const getSession = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_KEY}`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    request_token: results.request_token
                })
            })
            const session = await getSession.json()
            if(session.session_id !== undefined) {
                const getAccountDetail = await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.API_KEY}&session_id=${session.session_id}`)
                const account = await getAccountDetail.json()
                Cookies.set('account', JSON.stringify(account), {expires: 7})
                Cookies.set('session_id', session.session_id, {expires: 7})
                Swal.fire({
                    title: 'Success',
                    text: 'Login success',
                    background: 'rgba(17, 24, 39, 1)',
                    icon: 'success'
                })
                router.reload()
            }
            setOpen(false)
            return results;
        }
        postData(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.API_KEY}`)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
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
        <Fragment>
            <nav className="bg-gray-900 py-2 md:h-16 md:flex md:items-center">
                <div className="md:container md:mx-auto md:px-3 flex justify-center flex-col md:flex-row items-center md:justify-between space-y-1 md:space-y-0 md:space-x-2">
                    <div ref={refHome}>
                        <Link href="/">
                            <span className="cursor-pointer text-yellow-500 text-3xl font-bold items-center flex hover:text-opacity-70 transition duration-200 lg:order-1">{process.env.APP_NAME}</span>
                        </Link>
                    </div>
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
                            <Menu as="div" className="relative">
                                <Menu.Button className="text-yellow-500 focus:outline-none focus:text-yellow-700 hover:text-yellow-700 transition duration-200 cursor-pointer">
                                    {accountData !== null ? 
                                    accountData.username
                                    : "More"}
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
                                    <Menu.Items className="absolute right-0 w-56 mt-2 z-10 origin-top-right bg-gray-900 divide-y divide-gray-100 shadow-lg focus:outline-none rounded">
                                        <div className="px-1 py-1">
                                            {Cookies.get('session_id') === undefined ? 
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                            active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                            } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                            onClick={openModalLogin}
                                                        >
                                                            Login
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            : <div className="p-2">
                                                <div className="flex justify-start items-center space-x-2">
                                                    <Image 
                                                        src={`https://www.gravatar.com/avatar/${accountData !== null &&  accountData.avatar.gravatar.hash}?s=50`}
                                                        width={50}
                                                        height={50}
                                                        loading="lazy"
                                                        className="rounded-full"
                                                    />
                                                    <span className="text-center text-yellow-500">{accountData !== null && accountData.username}</span>
                                                </div>
                                                <div className="border border-b border-gray-800 my-3"></div>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link href={`/profile/ratings`}>
                                                            <button
                                                                className={`${
                                                                active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                                } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                            >
                                                                Ratings
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link href={`/profile/favorites`}>
                                                            <button
                                                                className={`${
                                                                active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                                } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                            >
                                                                Favorites
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link href={`/profile/watchlists`}>
                                                            <button
                                                                className={`${
                                                                active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                                } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                            >
                                                                Watchlists
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                            active ? ' text-gray-200 bg-gray-800' : 'text-gray-500'
                                                            } group flex rounded-md items-center focus:outline-none w-full px-2 py-2 text-sm hover:text-gray-200 hover:bg-gray-800`}
                                                            onClick={handleLogout}
                                                        >
                                                            Logout
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            }
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                    </div>
                </div>
            </nav>

            <Transition appear as={Fragment} show={open}>
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
                        <span className="inline-block h-screen align-top" aria-hidden="true">&#8203;</span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-lg p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-2xl border-2 border-gray-600 md:border-none rounded-md">
                                <div className="flex justify-between items-center">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-500">Login Website</Dialog.Title>
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
                                    <span className="block text-xs text-gray-500">for user login. must be use account from TMDB website. if dont have. please register to TMDB and comeback again.</span>
                                    <form className="mt-3" onSubmit={handleSubmitLogin} autoComplete="off">
                                        <div className="flex flex-col justify-start items-start w-full my-1 relative">
                                            <label htmlFor="username" className="text-yellow-500">Username</label>
                                            <input type="text" onKeyUp={handleUsername} id="username" name="username" className="px-4 py-2 rounded w-full focus:outline-none bg-gray-800 text-yellow-500" />
                                            <small className="text-xs mt-1 text-gray-700">E.G : example123</small>
                                        </div>
                                        <div className="flex flex-col justify-start items-start w-full my-1 relative">
                                            <label htmlFor="password" className="text-yellow-500">Password</label>
                                            <input type="password" onKeyUp={handlePassword} id="password" name="password" className="px-4 py-2 rounded w-full focus:outline-none bg-gray-800 text-yellow-500" />
                                            <small className="text-xs mt-1 text-gray-700">E.G : example123</small>
                                        </div>
                                        <button type="submit" className="bg-yellow-500 rounded px-2 py-1 text-xl text-gray-900 hover:opacity-70 w-36">Login</button>
                                    </form>
                                    <div className="border border-b border-gray-800 my-3"></div>
                                    <div className="text-center text-sm text-gray-700">
                                        <span>Dont have account? <a target="_blank" href="https://www.themoviedb.org/signup" className="text-yellow-500">Register here</a></span>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    )
}

export default Navbar