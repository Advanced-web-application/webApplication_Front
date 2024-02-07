import { useEffect, useState } from 'react'
import { IUser } from '../Profile'
import profileService, { CanceledError } from "../services/profile-service"
import Profile from "../Profile"
import { userIDLogin } from './Login_components'
import { userID } from './Registration';

let Id='';
if(userID)
{
    Id = userID;
   
}
else
{
    Id = userIDLogin;
}

const handleEdit = (userId: string) => {
    // render to the edit profile page
    console.log(`Editing user with id: ${userId}`);
}



function ProfileDetalis() {
        const [user, setUser] = useState<IUser>()
        const [error, setError] = useState()
        useEffect(() => {
            const { req, abort } = profileService.getUserById(Id)
            req.then((res) => {
                setUser(res.data)
                console.log("userId:" +res.data._id)
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
             <h1>Profile Details</h1>
            <div>
                {error && <p className='text-danger'>{error}</p>}
            </div>
            
            {/* <div className="p-4">
                {user && user.filter(user => user._id === '12345678').map(user => <Profile key={user._id} profile={user} />)}
        
           </div> */}

            {/* <div className="p-4">
                {user && user.filter(user => user._id === '123456789').map(user => (
                    <div key={user._id}>
                        <Profile profile={user} />
                        <button className="btn btn-primary" onClick={() => handleEdit(user._id)}>Edit Profile</button>
                    </div>
                ))}
            </div>  */}

           

            <div className="p-4">
                {user && 
                    <div key={user._id}>
                        <Profile profile={user} />     
                        <button className="btn btn-primary" onClick={() => handleEdit(user._id)}>Edit Profile</button>
                    </div>
                }
            </div>
  
           </>
        )
        
}

export default ProfileDetalis
