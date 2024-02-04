import { useEffect, useState } from 'react'
import { IUser } from './Profile_component'
import profileService, { CanceledError } from "./services/profile"

function ProfileDetalis() {
        const [users, setUser] = useState<IUser[]>([])
        const [error, setError] = useState()
        useEffect(() => {
            const { req, abort } = profileService.getUserById()
            req.then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err)
                if (err instanceof CanceledError) return
                setError(err.message)
            })
            return () => {
                abort()
            }
        
        }, [])
        // return (
        //     <div>
        //         {posts.map((post, index) => <Post key={index} post={post} />)}
        //     </div>
        // )
        
}
    