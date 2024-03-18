import { useEffect, useState } from 'react'
import { IUser } from '../ProfileDetails'
import profileService, { CanceledError } from "../services/profile-service"
import ProfileDetails from "../ProfileDetails"
//import { userIDLogin } from './Login_components'
//import { userID } from './Registration';


import { useNavigate } from 'react-router-dom'
//import { useLocation } from 'react-router-dom';

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
    //const location = useLocation();
    const userID= localStorage.getItem('userID');
    //const userID = location.state?.userID;
   

        const [user, setUser] = useState<IUser>()
        const [error] = useState()

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
                    const { req, abort } = await profileService.getUserById(userID!);
                    abortController.abort = abort;
                    const res = await req;

                    if (res) {
                        console.log("response image:" + res.data.image);
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
            navigate('/profileedit');
        }

        const handleButtonClick = () => {
            console.log(`userID: ${userID}`);
            navigate('/feed');
        };

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundColor: "#f8d7da" }}>
                <p className="mb-4 text-danger">Error: You are not logged in.</p>
                <button onClick={() => navigate('/login')} className="btn btn-primary">Go to Login</button>
            </div>
            );
        }
        return (
            <>
            <div style={{ backgroundColor: "#FFF8DC" }}>
             <h1 className="text-center">Profile Details</h1>
            <div>
                {error && <p className='text-danger'>{error}</p>}
            </div>
    
                <button onClick={handleButtonClick} className="btn btn-secondary">
                    go backt to feed
                </button>

            <div className="p-4">
                {user && 
                    <div key={user._id}>
                        <ProfileDetails profile={user} />     
                        <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-primary" onClick={() => handleEdit(user._id)}>Edit Profile</button>
</                      div>
                    </div>
                }
                
            </div>
            </div>
  
           </>
        )
        
}

export default Profile
