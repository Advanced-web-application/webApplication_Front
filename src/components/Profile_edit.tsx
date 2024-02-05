
import { IUser } from '../Profile';
import profileService from "../services/profile-service";
import { useForm } from "react-hook-form";
import avatar from '../assets/avatar.jpeg'

import { ChangeEvent, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { uploadPhoto } from '../services/file-service'
import editUser from "../services/profile-service"



function ProfileEdit() {
    const [imgSrc, setImgSrc] = useState<File>()

    const fileInputRef = useRef<HTMLInputElement>(null)
    const nameInputRef = useRef<HTMLInputElement>(null)
    const ageInputRef = useRef<HTMLInputElement>(null)
    const genderInputRef = useRef<HTMLInputElement>(null)
    const IdInputRef = useRef<HTMLInputElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc(e.target.files[0])
        }
    }
    const selectImg = () => {
        console.log("Selecting image...")
        fileInputRef.current?.click()
    }

    const edit = async () => {
        const url = await uploadPhoto(imgSrc!);
        console.log("upload returned:" + url);
        if (nameInputRef.current?.value && ageInputRef.current?.value && genderInputRef.current?.value && 
            IdInputRef.current?.value && emailInputRef.current?.value && passwordInputRef.current?.value) {
            const user: IUser = {
                _id: IdInputRef.current?.value,
                fullName: nameInputRef.current?.value,
                age : Number(ageInputRef.current?.value),  
                gender: genderInputRef.current?.value,
                email: emailInputRef.current?.value,
                password: passwordInputRef.current?.value,
                image: url
            }
            const res = await editUser(user)
            console.log(res)
        }
    }


    return (
        <div className="vstack gap-3 col-md-7 mx-auto">
            <h1>Edit Profile:</h1>
            <div className="d-flex justify-content-center position-relative">
                <img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "230px", width: "230px" }} className="img-fluid" />
                <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
                    <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
            </div>

            <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>

            <div className="form-floating">
                <input ref={fileInputRef} type="file" className="form-control" id="floatingFile" placeholder="" />
                <label htmlFor="floatingFile">Profile Picture</label>
            </div>
            <div className="form-floating">
                <input ref={nameInputRef} type="text" className="form-control" id="floatingName" placeholder="" />
                <label htmlFor="floatingName">Full Name</label>
            </div>
            <div className="form-floating">
                <input ref={ageInputRef} type="number" className="form-control" id="floatingAge" placeholder="" />
                <label htmlFor="floatingAge">Age</label>
            </div>
            <div className="form-floating">
                <input ref={genderInputRef} type="text" className="form-control" id="floatingGender" placeholder="" />
                <label htmlFor="floatingGender">Gender</label>
            </div>
            <div className="form-floating">
                <input ref={IdInputRef} type="text" className="form-control" id="floatingId" placeholder="" disabled />
                <label htmlFor="floatingId">ID</label>
            </div>
            <div className="form-floating">
                <input ref={emailInputRef} type="email" className="form-control" id="floatingEmail" placeholder="" />
                <label htmlFor="floatingEmail">Email</label>
            </div>
            <div className="form-floating">
                <input ref={passwordInputRef} type="password" className="form-control" id="floatingPassword" placeholder="" />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button type="button" className="btn btn-primary" onClick={edit}>Update Profile</button>

        </div>
        )
}

export default ProfileEdit;
