import { useEffect, useState } from 'react'
import { IUser } from '../ProfileDetails'
import profileService, { CanceledError } from "../services/profile-service"
import ProfileDetails from "../ProfileDetails"
import { userIDLogin } from './Login_components'
import { userID } from './Registration';


import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

 export let Id:string;
// if(userID)
// {
//     Id = userID;  
// }
// else
// {
//     Id = userIDLogin;
// }


function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;
    const accessToken = localStorage.getItem('accessToken'); // Replace with how you access your access token
    if (!accessToken) {
        return (
            <div>
                <p>Error: You are not logged in.</p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        );
    }

        const [user, setUser] = useState<IUser>()
        const [error, setError] = useState()

        // useEffect(() => {
        //     const { req, abort } = profileService.getUserById(userID)
        //     req.then((res) => { 
        //         if (res) {
        //             setUser(res.data)
        //             console.log("userId:" +res.data._id)
        //         }
        //     }).catch((err) => {
        //         console.log(err)
        //         if (err instanceof CanceledError) return
        //         setError(err.message)
        //     })
        //     return () => {
        //         abort()
        //     }
        
        // }, [])

        useEffect(() => {
           const abortController = new AbortController();
            const fetchData = async () => { 
                console.log("making the request id useeffect", userID);
                try {
                    const { req, abort } = await profileService.getUserById(userID);
                    abortController.abort = abort;
                    const res = await req;

                    if (res) {
                        setUser(res.data);
                        console.log("userId:" + res.data._id);
                    }
                } catch (err) {
                    console.log(err);
                    if (err instanceof CanceledError) return;
                    //setError(err.message);
                }
            };
          console.log("cakk fetch data");
            fetchData();
            return () => {
                //abort()
                abortController.abort();
            }
        
        }, [])

        const handleEdit = (userId: string) => {
            // render to the edit profile page
            console.log(`Editing user with id: ${userId}`);
            navigate('/profileedit', { state: { userID } });
        }

        const handleButtonClick = () => {
            console.log(`userID: ${userID}`);
            navigate('/feed', { state: { userID } });
        };
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

                <button onClick={handleButtonClick} className="btn btn-secondary">
                    go backt to feed
                </button>

            <div className="p-4">
                {user && 
                    <div key={user._id}>
                        <ProfileDetails profile={user} />     
                        <button className="btn btn-primary" onClick={() => handleEdit(user._id)}>Edit Profile</button>
                    </div>
                }
                
            </div>
  
           </>
        )
        
}

export default Profile
