import Link from "next/link";

function Footer() {  
    return (
        <footer className="bg-gray-900">
            <div className=" container mx-auto p-5 grid md:grid-flow-col grid-cols-12 md:grid-cols-3 gap-5">
                <div className="flex flex-col items-start justify-start col-span-12 md:col-span-12">
                    <div className="text-yellow-500 text-5xl font-bold items-center flex">
                        <Link href="#">
                            <a>LUX</a>
                        </Link>
                    </div>
                    <hr className="w-full my-3" />
                    <div>
                        <h3 className="text-gray-300 text-xl">About</h3>
                        <p className="text-gray-500 text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti a maxime doloribus optio, ab sunt nemo magni blanditiis quia dolores dicta ad dolorem laborum quas quo ducimus commodi facilis obcaecati.</p>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-12">
                    <h3 className="text-gray-300 text-xl">Contact Us</h3>
                    <p className="text-gray-500 text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti a maxime doloribus optio, ab sunt nemo magni blanditiis quia dolores dicta ad dolorem laborum quas quo ducimus commodi facilis obcaecati.</p>
                </div>
                <div className="col-span-12 md:col-span-12">Coba</div>
            </div>
        </footer>
    )
}

export default Footer;