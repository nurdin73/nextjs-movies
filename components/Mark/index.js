import { Fragment, useState, useEffect } from "react"
import Cookies from "js-cookie"
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import Swal from 'sweetalert2'
import { Popover } from "@headlessui/react";
import StarRatings from 'react-star-ratings'

function Mark({media_id, media_type}) {
    return (
        <Fragment>
            <ul className="flex md:justify-start justify-center md:space-x-5 space-x-3 mt-3 md:mb-0 mb-3">
                <Btn 
                    title="Favorite"
                    icon={<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />}
                    media_id={media_id}
                    media_type={media_type}
                    type_btn="favorite"
                />
                <Btn 
                    title="Watchlist"
                    icon={<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />}
                    media_id={media_id}
                    media_type={media_type}
                    type_btn="watchlist"
                />
                <Btn 
                    icon={<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />} 
                    title="Rate"
                    media_id={media_id}
                    media_type={media_type}
                    type_btn="rated"
                />
            </ul>
            
        </Fragment>
    )
}

function Btn({title, icon, media_id, media_type, type_btn}) {
    const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip();
    const [accountStates, setAccountStates] = useState(null)
    const [account, setAccount] = useState(null)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        async function getAccountStates() {
            setAccountStates(null)
            const reqAccountStates = await fetch(`https://api.themoviedb.org/3/${media_type}/${media_id}/account_states?api_key=${process.env.API_KEY}&session_id=${Cookies.get('session_id')}`)
            const res = await reqAccountStates.json()
            setAccountStates(res)
            setRating(res.rated !== false ? res.rated.value / 2 : 0)
        }
        if(Cookies.get('session_id') !== undefined) {
            setAccount(JSON.parse(Cookies.get('account')))
            getAccountStates()
        }
    }, [setAccountStates, media_type, media_id, setRating])

    const handleSetMark = (media, id, type, status) => async (newRating, name) => {
        const url = `https://api.themoviedb.org/3/account/${account?.id}/${type}?api_key=${process.env.API_KEY}&session_id=${Cookies.get('session_id')}`
        async function postData(url = "", data = {}) {
            const post = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            })
            const res = await post.json()
            if(res.success === true) {
                Swal.fire({
                    title: 'Success!',
                    text: res.status_message,
                    background: 'rgba(17, 24, 39, 1)',
                    icon: 'success'
                })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: res.status_message,
                    background: 'rgba(17, 24, 39, 1)',
                    icon: 'error',
                })
            }
            const reqAccountStates = await fetch(`https://api.themoviedb.org/3/${media_type}/${media_id}/account_states?api_key=${process.env.API_KEY}&session_id=${Cookies.get('session_id')}`)
            const result = await reqAccountStates.json()
            setAccountStates(result)
        }
        if(type === "favorite") {
            const data = {
                media_type: media_type,
                media_id: media_id,
                favorite: status === true ? false : true
            }
            postData(url, data)
        } else if(type === "watchlist") {
            const data = {
                media_type: media_type,
                media_id: media_id,
                watchlist: status === true ? false : true
            }
            postData(url, data)
        } else {
            setRating(newRating)
            const data = {
                value: newRating * 2
            }
            const urlRating = `https://api.themoviedb.org/3/${media}/${id}/rating?api_key=${process.env.API_KEY}&session_id=${Cookies.get('session_id')}`
            postData(urlRating, data)
        }
    }

    if(type_btn === "favorite") {
        return (
            <Fragment>
                <li ref={setTriggerRef} onClick={handleSetMark(media_type, media_id, type_btn, accountStates?.favorite)} className="bg-gray-900 p-3 group rounded-full cursor-pointer shadow transform transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${accountStates?.favorite ? "text-yellow-500" : "text-gray-500"} group-hover:text-yellow-500`} viewBox="0 0 20 20" fill="currentColor">
                        {icon}
                    </svg>
                    {visible && (
                        <div
                            ref={setTooltipRef}
                            {...getTooltipProps({ className: 'tooltip-container' })}
                        >
                            {title}
                            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                        </div>
                    )}
                </li>
            </Fragment>
        )
    } else if(type_btn === "watchlist") {
        return (
            <Fragment>
                <li ref={setTriggerRef} onClick={handleSetMark(media_type, media_id, type_btn, accountStates?.watchlist)} className="bg-gray-900 p-3 group rounded-full cursor-pointer shadow transform transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${accountStates?.watchlist ? "text-yellow-500" : "text-gray-500"} group-hover:text-yellow-500`} viewBox="0 0 20 20" fill="currentColor">
                        {icon}
                    </svg>
                    {visible && (
                        <div
                            ref={setTooltipRef}
                            {...getTooltipProps({ className: 'tooltip-container' })}
                        >
                            {title}
                            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                        </div>
                    )}
                </li>
            </Fragment>
        )
    } else if(type_btn === "rated") {
        return (
            <Fragment>
                <Popover className="relative" as="li">
                    <Popover.Button className="bg-gray-900 focus:outline-none p-3 group rounded-full cursor-pointer shadow transform transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${rating > 0 ? "text-yellow-500" : "text-gray-500"} group-hover:text-yellow-500`} viewBox="0 0 20 20" fill="currentColor">
                            {icon}
                        </svg>
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 w-40 transform -translate-x-1/2 left-1/2 bg-gray-900 flex justify-center py-1 mt-2 rounded items-center">
                        <StarRatings
                            rating={rating}
                            starRatedColor="rgba(245, 158, 11, 1)"
                            changeRating={handleSetMark(media_type, media_id, type_btn, accountStates?.rated)}
                            numberOfStars={5}
                            name='rating'
                            starDimension="25px"
                            starSpacing="3px"
                            starHoverColor="rgba(245, 158, 11, 1)"
                        />
                    </Popover.Panel>
                </Popover>
            </Fragment>
        )
    }
}

export default Mark