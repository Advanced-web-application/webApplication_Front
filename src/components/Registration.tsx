// import { ChangeEvent, useRef, useState } from 'react'
// import avatar from '../assets/avatar.jpeg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faImage } from '@fortawesome/free-solid-svg-icons'
// import { uploadPhoto } from '../services/file-service'
// import { IUser } from '../ProfileDetails'
// import { registrUser, googleSignin } from '../services/user-service'
// import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import z from "zod"

// import { useNavigate } from 'react-router-dom'

// export let userID: string

// const schema = z.object({
//     fullName: z.string().min(3, "Name must be longer than 3 characters").max(20, "Name must be less than 20 characters"),
//     age: z.number().min(18, "Age must be more than 18"),
//     gender: z.enum(["Male", "Female", "Other"], "Invalid gender. Must be 'Male', 'Female', or 'Other'"),
//     _id: z.string().length(9, "ID must be exactly 9 digits"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     image: z.string().url("Invalid image URL").nullable(), // Allow null or empty string for image
// });

// type FormData = z.infer<typeof schema>

// function Registration() {

//     const navigate = useNavigate();
    
//     const [imgSrc, setImgSrc] = useState<File>()
//     const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
//         console.log(e.target.value)
//         if (e.target.files && e.target.files.length > 0) {
//             setImgSrc(e.target.files[0])
//         }
//     }

//     const onImageUploadButtonClick = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     }

//     const registerUser = async (data: FormData) => {
//         console.log("register!")
//         const url = await uploadPhoto(imgSrc!);
//         console.log("upload returned:" + url);
//         const user: IUser = {
//             ...data,
//             image: url
//         }
//         const res = await registrUser(user)
//         userID = res._id ?? '';
//         console.log(res)

//         // Store tokens in localStorage
//         if (res.accessToken) {
//             localStorage.setItem('accessToken', res.accessToken);
//         }
//         if (res.refreshToken) {
//             localStorage.setItem('refreshToken', res.refreshToken);
//         }
//         localStorage.setItem('userID', userID);

//         navigate('/feed', { state: { userID } });
//     }

//     const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
//         console.log(credentialResponse)
//         try {
//             const res = await googleSignin(credentialResponse)
//             userID = res._id ?? '';
//             console.log(res)
//             if (res.accessToken) {
//                 localStorage.setItem('accessToken', res.accessToken);
//             }
//             if (res.refreshToken) {
//                 localStorage.setItem('refreshToken', res.refreshToken);
//             }
//             navigate('/feed', { state: { userID } });
//         } catch (e) {
//             console.log(e)
//         }
//     }

//     const onGoogleLoginFailure = () => {
//         console.log("Google login failed")
//     }

//     const handleButtonClick = () => {
//         navigate('/login');
//     };

//     return (
//         <div className="vstack gap-3 col-md-7 mx-auto">
//             <h1>Register</h1>
//             <div className="d-flex justify-content-center position-relative">
//                 <img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "230px", width: "230px" }} className="img-fluid" />
//                 <button type="button" className="btn position-absolute bottom-0 end-0" onClick={onImageUploadButtonClick}>
//                     <FontAwesomeIcon icon={faImage} className="fa-xl" />
//                 </button>
//             </div>

//             <input style={{ display: "none" }} {...register("image", { required: "Image is required" })} type="file" onChange={imgSelected} ref={fileInputRef}></input>
//             {errors.image && <p className="text-danger">{errors.image.message}</p>}

//             <form onSubmit={handleSubmit(registerUser)}>
//                 <div className="form-floating">
//                     <input {...register("fullName")} type="text" className="form-control" id="floatingName" placeholder="Full Name" />
//                     <label htmlFor="floatingName">Full Name</label>
//                     {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
//                 </div>
//                 <div className="form-floating">
//                     <input {...register("age", { valueAsNumber: true })} type="number" className="form-control" id="floatingAge" placeholder="Age" />
//                     <label htmlFor="floatingAge">Age</label>
//                     {errors.age && <p className="text-danger">{errors.age.message}</p>}
//                 </div>
//                 <div className="form-floating">
//                     <input {...register("gender")} type="text" className="form-control" id="floatingGender" placeholder="Gender" />
//                     <label htmlFor="floatingGender">Gender</label>
//                     {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
//                 </div>
//                 <div className="form-floating">
//                     <input {...register("_id")} type="text" className="form-control" id="floatingId" placeholder="ID" />
//                     <label htmlFor="floatingId">ID</label>
//                     {errors._id && <p className="text-danger">{errors._id.message}</p>}
//                 </div>
//                 <div className="form-floating">
//                     <input {...register("email")} type="text" className="form-control" id="floatingInput" placeholder="Email" />
//                     <label htmlFor="floatingInput">Email</label>
//                     {errors.email && <p className="text-danger">{errors.email.message}</p>}
//                 </div>
//                 <div className="form-floating">
//                     <input {...register("password")} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
//                     <label htmlFor="floatingPassword">Password</label>
//                     {errors.password && <p className="text-danger">{errors.password.message}</p>}
//                 </div>
//                 <button type="submit" className="btn btn-primary">Register</button>
//             </form>

//             <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />

//             <button onClick={handleButtonClick} className="btn btn-primary">
//               Already have a member? Log in here
//             </button>
//         </div>
//     )
// }

// export default Registration


import { ChangeEvent, useRef, useState, useEffect } from 'react'
import avatar from '../assets/avatar.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { uploadPhoto } from '../services/file-service'
import { IUser } from '../ProfileDetails'
import { registrUser, googleSignin } from '../services/user-service'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { useNavigate } from 'react-router-dom'

export let userID: string

const schema = z.object({
    fullName: z.string().min(3, "Name must be longer than 3 characters").max(20, "Name must be less than 20 characters"),
    age: z.number().min(18, "Age must be more than 18"),
    gender: z.enum(["Male", "Female", "Other"]),
    _id: z.string().length(9, "ID must be exactly 9 digits"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    image: z.string().url({ message: 'Image URL is required' }),
});

type FormData = z.infer<typeof schema>

function Registration() {

    const navigate = useNavigate();
    const [registerError, setregisterError] = useState<string | null>(null);
    
    const [imgSrc, setImgSrc] = useState<File>()
    const { register, handleSubmit, formState: { errors } ,setValue,trigger} = useForm<FormData>({ resolver: zodResolver(schema) })

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (imgSrc) {
          setValue("image", URL.createObjectURL(imgSrc));
        }
      }, [imgSrc, setValue]);

    // const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    //     console.log(e.target.value)
    //     if (e.target.files && e.target.files.length > 0) {
    //         setImgSrc(e.target.files[0])
    //     }
    // }

    const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc(e.target.files[0]);
            setValue("image", URL.createObjectURL(e.target.files[0]));
            trigger("image");
        }
    }
    

    const selectImg = () => {
        fileInputRef.current?.click();
      };

    const onImageUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const registerUser = async (data: FormData) => {
        try {
        console.log("register!")
        let url
        if(imgSrc) {
         url = await uploadPhoto(imgSrc!);
        console.log("upload returned:" + url);
        }
        // const url = await uploadPhoto(imgSrc!);
        // console.log("upload returned:" + url);
        const user: IUser = {
            ...data,
            image: url
        }
        console.log(" image: " + user.image)
        console.log(" email: " + user.email)
        console.log("password: " + user.password)
        const res = await registrUser(user)
        userID = res._id ?? '';
        console.log(res)
        console.log("register image: " + res.image)

        // Store tokens in localStorage
        if (res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
        }
        if (res.refreshToken) {
            localStorage.setItem('refreshToken', res.refreshToken);
        }
        localStorage.setItem('userID', userID);

        navigate('/feed');
    } catch (err) {
        console.log("err: " + err);
        setregisterError("email or id already exist...");
    }
}

    const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        console.log(credentialResponse)
        try {
            const res = await googleSignin(credentialResponse)
            userID = res._id ?? '';
            console.log(res)
            if (res.accessToken) {
                localStorage.setItem('accessToken', res.accessToken);
            }
            if (res.refreshToken) {
                localStorage.setItem('refreshToken', res.refreshToken);
            }
            localStorage.setItem('userID', userID);
            navigate('/feed');
        } catch (e) {
            console.log(e)
        }
    }

    const onGoogleLoginFailure = () => {
        console.log("Google login failed")
    }

    const handleButtonClick = () => {
        navigate('/login');
    };

    return (
        <div className="vstack gap-3 col-md-7 mx-auto">
            <h1>Register</h1>
            <div className="d-flex justify-content-center position-relative">
            {imgSrc && <img src={URL.createObjectURL(imgSrc)} alt="Post" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
            <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
              <FontAwesomeIcon icon={faImage} className="fa-xl" />
            </button>
          </div>

          <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>
          {errors.image && <p>{errors.image.message}</p>}






            {/* <div className="d-flex justify-content-center position-relative">
                <img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "230px", width: "230px" }} className="img-fluid" />
                <button type="button" className="btn position-absolute bottom-0 end-0" onClick={onImageUploadButtonClick}>
                    <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
            </div>
            <input style={{ display: "none" }}  type="file" onChange={imgSelected} ref={fileInputRef}></input> */}




            {/* <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input> */}

            {/* <input style={{ display: "none" }} {...register("image", { required: "Image is required" })} type="file" onChange={imgSelected} ref={fileInputRef}></input>
            {errors.image && <p className="text-danger">Image is required</p>} */}

            <form onSubmit={handleSubmit(registerUser)}>
                <div className="form-floating">
                    <input {...register("fullName")} type="text" className="form-control" id="floatingName" placeholder="Full Name" />
                    <label htmlFor="floatingName">Full Name</label>
                    {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
                </div>
                <div className="form-floating">
                    <input {...register("age", { valueAsNumber: true })} type="number" className="form-control" id="floatingAge" placeholder="Age" />
                    <label htmlFor="floatingAge">Age</label>
                    {errors.age && <p className="text-danger">{errors.age.message}</p>}
                </div>
                {/* <div className="form-floating">
                    <input {...register("gender")} type="text" className="form-control" id="floatingGender" placeholder="Gender" />
                    <label htmlFor="floatingGender">Gender</label>
                    {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
                </div> */}
                <div className="form-floating">
                <select {...register("gender")} className="form-control" id="floatingGender">
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>
                <label htmlFor="floatingGender">Gender</label>
                {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
            </div>
                <div className="form-floating">
                    <input {...register("_id")} type="text" className="form-control" id="floatingId" placeholder="ID" />
                    <label htmlFor="floatingId">ID</label>
                    {errors._id && <p className="text-danger">{errors._id.message}</p>}
                </div>
                <div className="form-floating">
                    <input {...register("email")} type="text" className="form-control" id="floatingInput" placeholder="Email" />
                    <label htmlFor="floatingInput">Email</label>
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="form-floating">
                    <input {...register("password")} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            {registerError && <p style={{ color: 'red' }}>{registerError}</p>}

            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />

            <button onClick={handleButtonClick} className="btn btn-primary">
              Already have a member? Log in here
            </button>
        </div>
    )
}

export default Registration
