import { ChangeEvent, useEffect, useState,useRef } from 'react';
import profileService, { CanceledError } from '../services/profile-service';
import { IUser } from '../ProfileDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import avatar from '../assets/avatar.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { uploadPhoto } from '../services/file-service'

const schema = z.object({
    fullName: z.string().min(3, "Full Name must be longer than 3 characters"),
    age: z.number().min(18, "Age must be more than 18"),
    gender: z.enum(["Male", "Female", "Other"], "Invalid gender. Must be 'Male', 'Female', or 'Other'"),
    _id: z.string().length(9, "ID must be exactly 9 characters"),
    image: z.string().url("Invalid image URL"),
    email: z.string().email("Invalid email address")
});

type FormData = z.infer<typeof schema>;

function ProfileEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({ resolver: zodResolver(schema) });

    const [user, setUser] = useState<IUser>();
    const [imgSrc, setImgSrc] = useState<File>();

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
                    setUser(user);
                    setValue("fullName", user.fullName);
                    setValue("age", user.age);
                    setValue("gender", user.gender);
                    setValue("email", user.email);
                    setValue("image", user.image);
                }
            } catch (err) {
                console.log(err);
                if (err instanceof CanceledError) return;
                //setError(err.message);
            }
        };

        fetchData();
        return () => {
            abortController.abort();
        };
    }, [userID, setValue]);

    const onSubmit = async (data: FormData) => {
        let imageUrl;
        if (imgSrc) {
            imageUrl = await uploadPhoto(imgSrc);
        } else {
            imageUrl = data.image;
        }

        const updatedProfile = {
            fullName: data.fullName,
            age: data.age,
            gender: data.gender,
            _id: data._id,
            image: imageUrl,
            email: data.email
        };

        const res = await profileService.editUser(userID, updatedProfile);
        setUser(res.data);
        navigate('/profile', { state: { userID } });
    };

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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-3">
            <h1>Edit Profile</h1>
            <div className="mb-3">
                {user && user.image && <img src={user.image} alt="User" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
                <div className="d-flex justify-content-center position-relative">
                    {imgSrc && <img src={URL.createObjectURL(imgSrc)} style={{ height: "230px", width: "230px" }} className="img-fluid" />}
                    <button type="button" className="btn position-absolute bottom-0 end-0" onClick={onImageUploadButtonClick}>
                        <FontAwesomeIcon icon={faImage} className="fa-xl" />
                    </button>
                </div>
                <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>
                {errors.image && <p className="text-danger">{errors.image.message}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label">Full Name:</label>
                <input type="text" className="form-control" {...register("fullName")} defaultValue={user?.fullName} />
                {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label">Age:</label>
                <input type="number" min="18" className="form-control" {...register("age")} defaultValue={user?.age} />
                {errors.age && <p className="text-danger">{errors.age.message}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label">Gender:</label>
                <input type="text" className="form-control" {...register("gender")} defaultValue={user?.gender} />
                {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" {...register("email")} defaultValue={user?.email} />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
    )
}

export default ProfileEdit;
