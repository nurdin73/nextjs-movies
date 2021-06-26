import { useRouter } from 'next/router'
function SessionCreate() {  
    const router = useRouter()
    const {request_token, approved} = router.query
    return (
        <div>
            {request_token}
        </div>
    )
}

export default SessionCreate