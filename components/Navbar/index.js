import Link from 'next/link'
function Navbar() { 
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
                <div className="w-3/4 md:w-1/2 block">
                    <form className="relative">
                        <input type="text" placeholder="Search movie, person, tv show" className="px-3 py-2 block w-full rounded text-yellow-500 bg-gray-800 border-0  outline-none" />
                        <button type="submit" className="absolute right-2 top-2 outline-none border-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
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