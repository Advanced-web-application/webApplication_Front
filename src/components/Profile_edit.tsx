
// import { IUser } from '../Profile';
// import profileService from "../services/profile-service";
// import { useForm } from "react-hook-form";
// import avatar from '../assets/avatar.jpeg'

// import { ChangeEvent, useRef, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faImage } from '@fortawesome/free-solid-svg-icons'
// import { uploadPhoto } from '../services/file-service'
// import editUser from "../services/profile-service"



// function ProfileEdit() {
//     const [imgSrc, setImgSrc] = useState<File>()

//     const fileInputRef = useRef<HTMLInputElement>(null)
//     const nameInputRef = useRef<HTMLInputElement>(null)
//     const ageInputRef = useRef<HTMLInputElement>(null)
//     const genderInputRef = useRef<HTMLInputElement>(null)
//     const IdInputRef = useRef<HTMLInputElement>(null)
//     const emailInputRef = useRef<HTMLInputElement>(null)
//     const passwordInputRef = useRef<HTMLInputElement>(null)

//     const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
//         console.log(e.target.value)
//         if (e.target.files && e.target.files.length > 0) {
//             setImgSrc(e.target.files[0])
//         }
//     }
//     const selectImg = () => {
//         console.log("Selecting image...")
//         fileInputRef.current?.click()
//     }

//     const edit = async () => {
//         const url = await uploadPhoto(imgSrc!);
//         console.log("upload returned:" + url);
//         if (nameInputRef.current?.value && ageInputRef.current?.value && genderInputRef.current?.value && 
//             IdInputRef.current?.value && emailInputRef.current?.value && passwordInputRef.current?.value) {
//             const user: IUser = {
//                 _id: IdInputRef.current?.value,
//                 fullName: nameInputRef.current?.value,
//                 age : Number(ageInputRef.current?.value),  
//                 gender: genderInputRef.current?.value,
//                 email: emailInputRef.current?.value,
//                 password: passwordInputRef.current?.value,
//                 image: url
//             }
//             const res = await editUser(user)
//             console.log(res)
//         }
//     }


//     return (
//         <div className="vstack gap-3 col-md-7 mx-auto">
//             <h1>Edit Profile:</h1>
//             <div className="d-flex justify-content-center position-relative">
//                 <img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "230px", width: "230px" }} className="img-fluid" />
//                 <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
//                     <FontAwesomeIcon icon={faImage} className="fa-xl" />
//                 </button>
//             </div>

//             <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>

//             <div className="form-floating">
//                 <input ref={fileInputRef} type="file" className="form-control" id="floatingFile" placeholder="" />
//                 <label htmlFor="floatingFile">Profile Picture</label>
//             </div>
//             <div className="form-floating">
//                 <input ref={nameInputRef} type="text" className="form-control" id="floatingName" placeholder="" />
//                 <label htmlFor="floatingName">Full Name</label>
//             </div>
//             <div className="form-floating">
//                 <input ref={ageInputRef} type="number" className="form-control" id="floatingAge" placeholder="" />
//                 <label htmlFor="floatingAge">Age</label>
//             </div>
//             <div className="form-floating">
//                 <input ref={genderInputRef} type="text" className="form-control" id="floatingGender" placeholder="" />
//                 <label htmlFor="floatingGender">Gender</label>
//             </div>
//             <div className="form-floating">
//                 <input ref={IdInputRef} type="text" className="form-control" id="floatingId" placeholder="" disabled />
//                 <label htmlFor="floatingId">ID</label>
//             </div>
//             <div className="form-floating">
//                 <input ref={emailInputRef} type="email" className="form-control" id="floatingEmail" placeholder="" />
//                 <label htmlFor="floatingEmail">Email</label>
//             </div>
//             <div className="form-floating">
//                 <input ref={passwordInputRef} type="password" className="form-control" id="floatingPassword" placeholder="" />
//                 <label htmlFor="floatingPassword">Password</label>
//             </div>

//             <button type="button" className="btn btn-primary" onClick={edit}>Update Profile</button>

//         </div>
//         )
// }

// export default ProfileEdit;


import { ChangeEvent, useEffect, useState } from 'react';
import profileService , { CanceledError } from '../services/profile-service';
import { IUser } from '../Profile';
import 'bootstrap/dist/css/bootstrap.min.css';




function EditProfile() {
   
    const [error, setError] = useState()
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [_id, setId] = useState('');
    const [image, setImage] =useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const { req, abort } = profileService.getUserById()
        req.then((res) => {
            const data = res.data;
            const user = data.filter((user: IUser) => user._id === '123456789')[0];
            if (user) {
                setFullName(user.fullName);
                setAge(user.age);
                setGender(user.gender);
                setId(user._id);
                setImage(user.image?? '');
                setEmail(user.email);
                setPassword('');
            }
        }).catch((err) => {
            console.log(err)
            if (err instanceof CanceledError) return
            setError(err.message)
        })
        return () => {
            abort()
        }
    
    }, [])



    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

    
        const updatedProfile = {
            fullName,
            age,
            gender,
            _id,
            image,
            email,
            password,
        };

        const res =  profileService.editUser(_id, updatedProfile)
        console.log(res);

    };
    return (
    //     <form onSubmit={handleSubmit}>
    //         <label>
    //             Image:
    //             <input type="file" onChange={(e) =>  {if(e.target.files!=null) setImage(URL.createObjectURL(e.target.files[0]))}} />
    //             {image && <img src={image} alt="User" />}
    //         </label>
    //         <label>
    //             Full Name:
    //             <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
    //         </label>
    //         <label>
    //             Age:
    //             <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
    //         </label>
    //         <label>
    //             Gender:
    //             <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
    //         </label>
    //         <label>
    //             Email:
    //             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //         </label>
    //         <label>
    //             Password:
    //             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //         </label>
    //         <button type="submit">Save Changes</button>
    //     </form>
    // );

        <form onSubmit={handleSubmit} className="m-3">
        <h1>Edit Profile</h1>
        <div className="mb-3">
                    {image && <img src={image} alt="User" className="img-thumbnail mb-2" style={{maxWidth: '200px'}} />}
                    <label className="form-label"></label>
                    <input type="file" className="form-control" onChange={(e) =>  {if(e.target.files!=null) setImage(URL.createObjectURL(e.target.files[0]))}} />
                </div>
        {/* <div className="mb-3"> 
            <label className="form-label">Image:</label>
            <input type="file" className="form-control" onChange={(e) =>  {if(e.target.files!=null) setImage(URL.createObjectURL(e.target.files[0]))}} />
            {image && <img src={image} alt="User" className="img-thumbnail mt-2" style={{maxWidth: '200px'}} />}
        </div> */}
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
        <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
    )

}

export default EditProfile;