import { useEffect, useState } from 'react'
import { IUser } from '../Profile'
import profileService, { CanceledError } from "../services/profile-service"
import Profile from "../Profile"

function ProfileDetalis() {
        const [user, setUser] = useState<IUser[]>([])
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
        return (
            <>
            <div>
                {error && <p className='text-danger'>{error}</p>}
            </div>
            
            <div className="p-4">
                {user && user.filter(user => user._id === '1234567890').map(user => <Profile key={user._id} profile={user} />)}
        
           </div>
           </>
        )
        
}

export default ProfileDetalis
    