import Image from "next/image";
import Link from "next/link";
import { forwardRef, Fragment } from "react";
import slugify from "slugify";

const TopBilledCast = forwardRef(({ casts }, ref) => {
    if(casts.length < 1) {
        return (
            <Fragment>
                <div className="bg-gray-900 px-3 py-2 text-gray-500 rounded">
                    Top billed casts not found
                </div>
            </Fragment>
        )
    }
    return (
        <ul className="grid grid-cols-7 gap-4">
        {casts.map((cast, key) => {
            if(key < 7) {
                return (
                    <Link href={`/detail/person/${cast.id}-${slugify(cast.name || cast.original_name, {
                        lower: true
                    })}`} ref={ref} key={key}>
                        <li className="relative overflow-hidden">
                            <Image 
                                src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                                alt={cast.name || cast.original_name}
                                width={400}
                                height={580}
                                className="rounded"
                            />
                            <div className="absolute block h-10 rounded-b px-2 bg-gray-900 bg-opacity-70 overflow-hidden bottom-1.5 right-0 left-0">
                                <span title={cast.name || cast.original_name} className="block text-white truncate hover:text-opacity-70 cursor-pointer text-sm font-bold">{cast.name}</span>
                                <span className="block text-gray-300 text-xs">{cast.character}</span>
                            </div>
                        </li>
                    </Link>
                )
            }
        })}
    </ul>
    )
})

export default TopBilledCast