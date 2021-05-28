import Link from 'next/link'
function Navbar() { 
    return (
        <nav className="bg-gray-900 py-2 h-16 flex items-center">
            <div className="container mx-auto flex justify-between">
                <div className="text-yellow-500 text-3xl font-bold items-center flex">
                    <Link href="/">
                        <span className="cursor-pointer">LUX</span>
                    </Link>
                </div>
                <div className="w-1/2 block">
                    <form className="relative">
                        <input type="text" placeholder="Search movie, person, tv show" className="px-3 py-2 block w-full rounded text-yellow-500 bg-gray-800 border-0  outline-none" />
                        <button type="submit" className="absolute right-2 top-2 outline-none border-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="flex items-center space-x-3">
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