import { forwardRef } from "react";
import Link from "next/link";
import slugify from "slugify";
const Genre = forwardRef(({genre, isActive}, ref) => {
    return (
        <div ref={ref}>
            <Link href={`/genre/${genre.id}-${slugify(genre.name, {lower:true})}`}>
                <div className={`cursor-pointer rounded md:px-4 hover:opacity-70 ${isActive ? `bg-yellow-500 text-gray-800` : 'bg-gray-800 md:bg-gray-900 text-yellow-500'} px-2.5`}>{genre.name}</div>
            </Link>
        </div>
    )
})

export default Genre