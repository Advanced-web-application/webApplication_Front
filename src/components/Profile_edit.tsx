// import { ChangeEvent, useEffect, useState, useRef } from 'react';
// import profileService, { CanceledError } from '../services/profile-service';
// import { IUser } from '../ProfileDetails';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import z from "zod";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faImage } from '@fortawesome/free-solid-svg-icons'
// import { uploadPhoto } from '../services/file-service'

// const schema = z.object({
//     fullName: z.string().min(3, "Full Name must be longer than 3 characters"),
//     age: z.number().min(18, "Age must be more than 18"),
//     gender: z.enum(["Male", "Female", "Other"], "Invalid gender. Must be 'Male', 'Female', or 'Other'"),
//     _id: z.string().length(9, "ID must be exactly 9 characters"),
//     email: z.string().email("Invalid email address")
// });

// type FormData = z.infer<typeof schema>;

// function ProfileEdit() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const userID = location.state?.userID;

//     const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({ resolver: zodResolver(schema) });

//     const [user, setUser] = useState<IUser>();
//     const [imgSrc, setImgSrc] = useState<File>(); 

//     useEffect(() => {
//         const abortController = new AbortController();
//         const fetchData = async () => {
//             try {
//                 const { req, abort } = await profileService.getUserById(userID);
//                 abortController.abort = abort;
//                 const res = await req;
//                 const data = res.data;
//                 const user = data;

//                 if (user) {
//                     setUser(user);
//                     setValue("fullName", user.fullName);
//                     setValue("age", user.age);
//                     setValue("gender", user.gender as "Male" | "Female" | "Other"); // Fix: Cast user.gender to the correct type
//                     setValue("email", user.email);
//                     //setImgSrc(user.image); // Set image URL
//                 }
//             } catch (err) {
//                 console.log("the error is here: " +err);
//                 if (err instanceof CanceledError) return;
//                 //setError(err.message);
//             }
//         };

//         fetchData();
//         return () => {
//             abortController.abort();
//         };
//     }, [userID, setValue]);

//     const onSubmit = async (data: FormData) => {
//         console.log("checking if getting here");
//         try{
//         let url;
//         if (imgSrc) {
//             url = await uploadPhoto(imgSrc!);
//             }
    
//         const updatedProfile = {
//             fullName: data.fullName,
//             age: data.age,
//             gender: data.gender,
//             _id: data._id,
//             image: url? url : user?.image,
//             email: data.email
//         };
    
//         const res = await profileService.editUser(userID, updatedProfile);
//         setUser(res.req.data);
//         navigate('/profile', { state: {userID : userID } }); // Redirect to /post after successful submission
//     } catch (err) {
//         console.log("the error is here: " +err);
//         //setError(err.message);
//     }
// }

    

//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setImgSrc(e.target.files[0]); // Set image File
//         }
//     }

//     const onImageUploadButtonClick = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     }

//     const accessToken = localStorage.getItem('accessToken'); 
//     if (!accessToken) {
//         return (
//             <div>
//                 <p>Error: You are not logged in.</p>
//                 <button onClick={() => navigate('/login')}>Go to Login</button>
//             </div>
//         );
//     }


//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="m-3">
//             <h1>Edit Profile</h1>
//             <div className="mb-3">
//                 {imgSrc && <img src={typeof imgSrc === 'string' ? imgSrc : URL.createObjectURL(imgSrc)} alt="User" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
//                 <div className="d-flex justify-content-center position-relative">
//                     <button type="button" className="btn position-absolute bottom-0 end-0" onClick={onImageUploadButtonClick}>
//                         <FontAwesomeIcon icon={faImage} className="fa-xl" />
//                     </button>
//                     <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>
//                 </div>
//                 {errors.image && <p className="text-danger">{errors.image.message}</p>}
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">Full Name:</label>
//                 <input type="text" className="form-control" {...register("fullName")} defaultValue={user?.fullName} />
//                 {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">Age:</label>
//                 <input type="number" min="18" className="form-control" {...register("age", { setValueAs: value => parseFloat(value) })} />
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">Gender:</label>
//                 <input type="text" className="form-control" {...register("gender")} defaultValue={user?.gender} />
//                 {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">Email:</label>
//                 <input type="email" className="form-control" {...register("email")} defaultValue={user?.email} />
//                 {errors.email && <p className="text-danger">{errors.email.message}</p>}
//             </div>

//             <button type="submit" className="btn btn-primary">Save Changes</button>
//         </form>
//     )
// }

// export default ProfileEdit;





 //working code start here 

import { ChangeEvent, useEffect, useState, useRef } from 'react';
import profileService, { CanceledError } from '../services/profile-service';
import { IUser } from '../ProfileDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { uploadPhoto } from '../services/file-service'

const schema = z.object({
    fullName: z.string().min(3, "Full Name must be longer than 3 characters"),
    age: z.number().min(18, "Age must be more than 18"),
    gender: z.string().min(3, "Gender must be provided").max(10, "Gender must be shorter than 10 characters"),
    email: z.string().email("Invalid email address"),
    image: z.string().url("Invalid image URL")
});

type FormData = z.infer<typeof schema>;

function ProfileEdit() {
    const navigate = useNavigate();
    //const location = useLocation();
   // const userID = location.state?.userID;
    const userID= localStorage.getItem('userID');
    const [user, setUser] = useState<IUser>();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: user?.fullName,
            age: user?.age,
            gender: user?.gender as 'Female',
            email: user?.email,
            //image: user?.image
        }
    });

    const [imgSrc, setImgSrc] = useState<File>(); 
    //const [error, setError] = useState<string>();

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
           try {
                const { req, abort } = await profileService.getUserById(userID!);
                abortController.abort = abort;
                const res = await req;
                const data = res.data;
                const user = data;

                if (user) {
                    setUser(user);
                    reset(user);
                }
            } catch (err) {
                console.log("the error is here: " +err);
                if (err instanceof CanceledError) return;
            }
        };

        fetchData();
        return () => {
            abortController.abort();
        };
    }, [reset]);

    const onSubmit = async (data: FormData) => {
        console.log("checking if getting here");
        try {
            let url;
            if (imgSrc) {
                url = await uploadPhoto(imgSrc!);
            }
    
            const updatedProfile = {
                fullName: data.fullName,
                age: data.age,
                gender: data.gender,
                _id: user?._id ?? '',
                image: url ? url : user?.image,
                email: data.email
            };

            const res = await profileService.editUser(userID!, updatedProfile);
            setUser(res.req.data);
            navigate('/profile', { state: { userID: userID } });
        } catch (err) {
            console.log("the error is here: " +err);
        }
    }

    const fileInputRef = useRef<HTMLInputElement>(null);

    const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc(e.target.files[0]);
        }
    }

    const onImageUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

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
<div style={{ backgroundColor: "#FFF8DC" }}>
    <form onSubmit={handleSubmit(onSubmit)} className="m-3">
        <h1 className="text-center">Edit Profile</h1>
        <div className="card p-3">
            <div className="mb-3 d-flex justify-content-center">
                {user?.image && <img src={user?.image} alt="Current Profile" className="img-thumbnail mb-2" style={{ height: "200px", width: "200px" }} />}
                <div className="d-flex justify-content-start position-relative">
            {imgSrc && <img src={URL.createObjectURL(imgSrc)} style={{ height: "200px", width: "200px" }} className="img-fluid" />}
            <button type="button" className="btn position-absolute" style={{ bottom: '10px', right: '10px' }} onClick={onImageUploadButtonClick}>
                <FontAwesomeIcon icon={faImage} className="fa-xl" />
            </button>
        </div>
                <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>
            </div>

            <div className="mb-3 d-flex justify-content-center">
    <label className="form-label fw-bold">Full Name:</label>
    <input type="text" className="form-control" style={{ width: '50%' }} {...register("fullName")} defaultValue={user?.fullName} />
    {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
</div>

<div className="mb-3 d-flex justify-content-center">
    <label className="form-label fw-bold">Age:</label>
    <input type="number" min="18" className="form-control" style={{ width: '50%' }} {...register("age", { setValueAs: value => parseFloat(value)})} defaultValue={user?.age} />
    {errors.age && <p className="text-danger">{errors.age.message}</p>}
</div>

{/* <div className="mb-3 d-flex justify-content-center">
    <label className="form-label fw-bold">Gender:</label>
    <input type="text" className="form-control" style={{ width: '50%' }} {...register("gender")} defaultValue={user?.gender} />
    {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
</div> */}
<div className="mb-3 d-flex justify-content-center">
    <label className="form-label fw-bold">Gender:</label>
    <select className="form-control" style={{ width: '50%' }} {...register("gender")} defaultValue={user?.gender}>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
    </select>
    {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
</div>

<div className="mb-3 d-flex justify-content-center">
    <label className="form-label fw-bold">Email:</label>
    <input type="email" className="form-control" style={{ width: '50%' }} {...register("email")} defaultValue={user?.email} />
    {errors.email && <p className="text-danger">{errors.email.message}</p>}
</div>

<div className="d-flex justify-content-center">
    <button type="submit" className="btn btn-primary ">Save Changes</button>
</div>
        </div>
    </form>
</div>

        // <div style={{ backgroundColor: "#FFF8DC" }}>
        // <form onSubmit={handleSubmit(onSubmit)} className="m-3">
        //     <h1 className="text-center">Edit Profile</h1>
        //     <div className="mb-3">
        //         {user?.image && <img src={user?.image} alt="Current Profile" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
        //         <div className="d-flex justify-content-center position-relative">
        //             {imgSrc && <img src={URL.createObjectURL(imgSrc)} style={{ height: "230px", width: "230px" }} className="img-fluid" />}
        //             <button type="button" className="btn position-absolute bottom-0 end-0" onClick={onImageUploadButtonClick}>
        //                 <FontAwesomeIcon icon={faImage} className="fa-xl" />
        //             </button>
        //         </div>
        //         <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>
        //     </div>

        //     <div className="mb-3">
        //         <label className="form-label">Full Name:</label>
        //         <input type="text" className="form-control" {...register("fullName")} defaultValue={user?.fullName} />
        //         {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
        //     </div>

        //     <div className="mb-3">
        //         <label className="form-label">Age:</label>
        //         <input type="number" min="18" className="form-control" {...register("age", { setValueAs: value => parseFloat(value)})} defaultValue={user?.age} />
        //         {errors.age && <p className="text-danger">{errors.age.message}</p>}
        //     </div>

        //     <div className="mb-3">
        //         <label className="form-label">Gender:</label>
        //         <input type="text" className="form-control" {...register("gender")} defaultValue={user?.gender} />
        //         {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
        //     </div>

        //     <div className="mb-3">
        //         <label className="form-label">Email:</label>
        //         <input type="email" className="form-control" {...register("email")} defaultValue={user?.email} />
        //         {errors.email && <p className="text-danger">{errors.email.message}</p>}
        //     </div>

        //     <button type="submit" className="btn btn-primary">Save Changes</button>
        // </form>
        // </div>
    )
}

export default ProfileEdit;
//working code ends here 

