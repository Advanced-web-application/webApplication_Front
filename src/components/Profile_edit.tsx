
import { ChangeEvent, useEffect, useState } from 'react';
import profileService , { CanceledError } from '../services/profile-service';
import { IUser } from '../ProfileDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userIDLogin } from '../components/Login_components'
import { userID } from '../components/Registration'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

//  let Id:string;
// if(userID)
// {
//     Id = userID;  
// }
// else
// {
//     Id = userIDLogin;
// }


function EditProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;

    const [user, setUser] = useState<IUser>()
   
    const [error, setError] = useState()
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [_id, setId] = useState('');
    const [image, setImage] =useState('')
    const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');

    // useEffect(() => {
    //     const { req, abort } = profileService.getUserById(userID)
    //     req.then((res) => {
    //         const data = res.data;
    //         const user = data;
    //         if (user) {
    //             setFullName(user.fullName);
    //             setAge(user.age);
    //             setGender(user.gender);
    //             setId(user._id);
    //             setImage(user.image?? '');
    //             setEmail(user.email);
    //             //setPassword('');
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
             try {
                 const { req, abort } = await profileService.getUserById(userID);
                 abortController.abort = abort;
                 const res = await req;
                 const data = res.data;
                 const user = data;

                 if (user) {
                    setFullName(user.fullName);
                    setAge(user.age);
                    setGender(user.gender);
                    setId(user._id);
                    setImage(user.image?? '');
                    setEmail(user.email);
                 }
             } catch (err) {
                 console.log(err);
                 if (err instanceof CanceledError) return;
                 //setError(err.message);
             }
         };
       
         fetchData();
         return () => {
             //abort()
             abortController.abort();
         }
     
     }, [])




    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedProfile = {
            fullName,
            age,
            gender,
            _id,
            image,
            email,  
        };

        const res = await profileService.editUser(_id, updatedProfile)
        console.log(res);
        const { req} = await profileService.getUserById(userID);
        if (req) {
         setUser(req.data);
        }
        navigate('/profile', { state: { userID } });

    };
    return (
    

        <form onSubmit={handleSubmit} className="m-3">
        <h1>Edit Profile</h1>
        <div className="mb-3">
                    {image && <img src={image} alt="User" className="img-thumbnail mb-2" style={{maxWidth: '200px'}} />}
                    <label className="form-label"></label>
                    <input type="file" className="form-control" onChange={(e) =>  {if(e.target.files!=null) setImage(URL.createObjectURL(e.target.files[0]))}} />
                </div>
        
        <div className="mb-3">
            <label className="form-label">Full Name:</label>
            <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="mb-3">
            <label className="form-label">Age:</label>
            <input type="number" className="form-control" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>
        <div className="mb-3">
            <label className="form-label">Gender:</label>
            <input type="text" className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {/* <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div> */}
        <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
    )

}

export default EditProfile;