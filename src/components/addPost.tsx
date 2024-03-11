import React, { useState } from 'react';
import { ChangeEvent, useEffect, useRef} from 'react'
import { PostData } from '../Post'
import postService, { CanceledError, addPost } from "../services/post-service"
import place_holder_image from '../assets/place_holder_image.png'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { uploadPhoto } from '../services/file-service'

import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export let postID : string;
export let PostIdDetails : string;

const PostSchema = z.object({
    name: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    //price: z.number().min(0, { message: 'Price must be a positive number' }).transform(parseFloat),
    price: z.string().min(1, { message: 'Price must be a positive number' }).transform(parseFloat),
    owner: z.string().min(1, { message: 'Owner is required' }),
});
type FormData = z.infer<typeof PostSchema>

function AddPost() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(PostSchema) })
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;


    const [imgSrc, setImgSrc] = useState<File>()
    const fileInputRef = useRef<HTMLInputElement>(null)
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
    

    const addNewPost = async (data: FormData) => {
        const url = await uploadPhoto(imgSrc!);
        console.log("upload returned:" + url);
        const post : PostData = {
            ...data,
            image: url
        }
        const res = await addPost(post)
        postID = res.req.data._id ?? '';
        console.log("postID: " + postID);
        console.log(res)
        navigate('/feed' , { state: { userID: userID } });
    }

    return (
        <div className="card">
          <div className="card-body">
            <div className="vstack gap-3 col-md-7 mx-auto">
              <h1>add new post:</h1>
              <div className="d-flex justify-content-center position-relative">
                <img src={imgSrc ? URL.createObjectURL(imgSrc) : place_holder_image} style={{ height: "50px", width: "50px" }} className="img-fluid" />
                <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
                <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
            </div>

              <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>

              <form onSubmit={handleSubmit(addNewPost)}>
                <div className="form-floating">
                  <input {...register("name")} type="text" className="form-control" id="floatingName" placeholder="" />
                  <label htmlFor="floatingName">Title</label>
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="form-floating">
                  <input {...register("description")} type="text" className="form-control" id="floatingDescription" placeholder="" />
                  <label htmlFor="floatingDescription">Description</label>
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div className="form-floating">
                  <input {...register("price")} type="number" className="form-control" id="floatingPrice" placeholder="" />
                  <label htmlFor="floatingPrice">Price</label>
                  {errors.price && <p>{errors.price.message}</p>}
                </div>
                <div className="form-floating">
                  <input {...register("owner")} type="text" className="form-control" id="floatingOwner" placeholder="" />
                  <label htmlFor="floatingOwner">Owner</label>
                  {errors.owner && <p>{errors.owner.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default AddPost;