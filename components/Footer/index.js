import Link from "next/link";

function Footer() {  
    return (
        <footer className="bg-gray-900">
            <div className="container mx-auto p-5 grid md:grid-cols-3 gap-5">
                <div className="col-span-3 md:col-span-1">
                    <div className="text-yellow-500 text-5xl font-bold items-center">
                        <Link href={'/'}>
                            <span className="cursor-pointer">LUX</span>
                        </Link>
                    </div>
                    <hr className="w-full my-3" />
                    <div>
                        <h3 className="text-gray-300 text-xl">About</h3>
                        <p className="text-gray-500 text-justify">
                            LUX is a website imdb movie, TV show and people. This website is created using API from <a href="https://www.themoviedb.org/" target="_blank" className="text-yellow-500 underline">TMDB API</a>.
                        </p>
                    </div>
                </div>
                <div className="col-span-3 md:col-span-1">
                    <h3 className="text-gray-300 text-xl">Contact Us</h3>
                    <ul className="flex flex-col space-y-1">
                        <li className="text-gray-500 flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href="mailto:nurdin.reverse73@gmail.com" target="_blank">Nurdin.reverse73@gmail.com</a>
                        </li>
                        <li className="text-gray-500 flex items-center space-x-1">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square" className="svg-inline--fa fa-facebook-square fa-w-14 h-6 w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                            </svg>
                            <a href="https://www.facebook.com/profile.php?id=100011768163546" target="_blank">Nurdin</a>
                        </li>
                        <li className="text-gray-500 flex items-center space-x-1">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram-square" className="svg-inline--fa fa-instagram-square fa-w-14 h-6 w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"></path>
                            </svg>
                            <a href="https://www.instagram.com/nurdin0301/" target="_blank">nurdin030101</a>
                        </li>
                        <li className="text-gray-500 flex items-center space-x-1">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" className="svg-inline--fa fa-linkedin fa-w-14 w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                            </svg>
                            <a href="https://www.linkedin.com/in/nurdin-nurdin/" target="_blank">Nurdin</a>
                        </li>
                        <li className="text-gray-500 flex items-center space-x-1">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" className="svg-inline--fa fa-github fa-w-16 w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                            </svg>
                            <a href="https://github.com/nurdin73" target="_blank">Nurdin73</a>
                        </li>
                    </ul>
                </div>
                <div className="col-span-3 md:col-span-1">
                    <h3 className="text-gray-300 text-xl">Help</h3>
                    <ul>
                        <li>
                            <Link href={'/'}>
                                <span className="cursor-pointer text-gray-500 hover:text-opacity-50">TV Show</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <span className="cursor-pointer text-gray-500 hover:text-opacity-50">Movies</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <span className="cursor-pointer text-gray-500 hover:text-opacity-50">People's</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-800 py-3 text-center">
                <span className="text-gray-400">CopyRight &copy; LUX { new Date().getFullYear() }</span>
            </div>
        </footer>
    )
}

export default Footer;