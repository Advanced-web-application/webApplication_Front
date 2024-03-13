// import { ChangeEvent, useEffect, useState } from 'react';
// import postService, { CanceledError } from '../services/post-service';
// import { PostData } from '../Post';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import z from "zod";

// const schema = z.object({
//     name: z.string().min(3, "Name must be longer than 3 characters"),
//     description: z.string(),
//     price: z.number().positive("Price must be a positive number"),
//     owner: z.string().min(3, "Owner ID must be longer than 3 characters"),
// });

// type FormData = z.infer<typeof schema>;

// function EditPost() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const PostIdEdit = location.state?.PostIdEdit;
//     const userID = location.state?.userID;
//     const PostIdDetails = location.state?.PostIdDetails;

//     const [post, setPost] = useState<PostData[]>([])
//     const [error, setError] = useState();
//     const [image, setImage] = useState('');
//     const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

//     useEffect(() => {
//         const { req, abort } = postService.getPostByID(PostIdDetails)
//         req.then((res) => {
//             const post = res.data;
//             if (post) {
//                 setImage(post.image);
//                 setName(post.name);
//                 setDescription(post.description);
//                 setPrice(post.price);
//                 setOwner(post.owner);
//             }
//         }).catch((err) => {
//             console.log(err)
//             if (err instanceof CanceledError) return
//             setError(err.message)
//         })
//         return () => {
//             abort()
//         }
//     }, [])

//     const handleDelete = async () => {
//         console.log("deleting post: " + name);
//         await postService.deletePost(PostIdDetails)
//         const { req } = postService.getPosts()
//         req.then((res) => {
//             setPost(res.data)
//         })
//         navigate('/feed', { state: { userID } });
//     };

//     const onSubmit = async (data: FormData) => {
//         const updatedPost = {
//             name: data.name,
//             image,
//             description: data.description,
//             price: data.price,
//             owner: data.owner
//         };

//         await postService.editPost(PostIdDetails, updatedPost)
//         navigate('/post', { state: { userID, PostIdDetails } });
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="m-3">
//             <h1>Edit Post</h1>
//             <div className="mb-3">
//                 {image && <img src={image} alt="Post" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
//                 <label className="form-label"></label>
//                 <input type="file" className="form-control" onChange={(e) => { if (e.target.files != null) setImage(URL.createObjectURL(e.target.files[0])) }} />
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Name:</label>
//                 <input type="text" className="form-control" {...register("name")} />
//                 {errors.name && <p className="text-danger">{errors.name.message}</p>}
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Description:</label>
//                 <input type="text" className="form-control" {...register("description")} />
//                 {errors.description && <p className="text-danger">{errors.description.message}</p>}
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Price:</label>
//                 <input type="number" className="form-control" {...register("price")} />
//                 {errors.price && <p className="text-danger">{errors.price.message}</p>}
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Owner ID:</label>
//                 <input type="text" className="form-control" {...register("owner")} />
//                 {errors.owner && <p className="text-danger">{errors.owner.message}</p>}
//             </div>
//             <button type="submit" className="btn btn-primary">Save Changes</button>
//             <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>Delete Post</button>
//         </form>
//     )
// }

// export default EditPost;


// import { ChangeEvent, useEffect, useState, useRef } from 'react';
// import postService, { CanceledError } from '../services/post-service';
// import { PostData } from '../Post';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import z from "zod";
// import avatar from '../assets/avatar.jpeg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faImage } from '@fortawesome/free-solid-svg-icons'

// const schema = z.object({
//     name: z.string().min(3, "Name must be longer than 3 characters"),
//     description: z.string().min(10, "Description must be longer than 10 characters"),
//     //price: z.number().positive("Price must be a positive number"),
//     price: z.string().min(1, { message: 'Price must be a positive number' }).transform(parseFloat),
//     owner: z.string().min(3, "Owner ID must be longer than 3 characters"),
//     image: z.string().url("Invalid image URL")
// });

// type FormData = z.infer<typeof schema>;

// function EditPost() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     //const PostIdEdit = location.state?.PostIdEdit;
//     const userID = location.state?.userID;
//     const PostIdDetails = location.state?.PostIdDetails;

//     const [post, setPost] = useState<PostData[]>([])
//     const [error, setError] = useState();
//     const [image, setImage] =useState('')
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState(0);
//     const [owner, setOwner] = useState('');
//     const [imgSrc, setImgSrc] = useState<File>()

//     const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

//     useEffect(() => {
//         const { req, abort } = postService.getPostByID(PostIdDetails)
//         req.then((res) => {
//             const post = res.data;
//             if (post) {
//                 setImage(post.image);
//                 setName(post.name);
//                 setDescription(post.description);
//                 setPrice(post.price);
//                 setOwner(post.owner);
//             }
//         }).catch((err) => {
//             console.log(err)
//             if (err instanceof CanceledError) return
//             setError(err.message)
//         })
//         return () => {
//             abort()
//         }
//     }, [])

 

//     const handleDelete = async () => {
//         console.log("deleting post: " + name);
//         await postService.deletePost(PostIdDetails)
//         const { req } = postService.getPosts()
//         req.then((res) => {
//             setPost(res.data)
//         })
//         navigate('/feed', { state: { userID } });
//     };

//     const onSubmit = async (data: FormData) => {
//         console.log("onSubmit: ");
//         const updatedPost = {
//             name: data.name,
//             image: data.image,
//             description: data.description,
//             price: data.price,
//             owner: data.owner
//         };
//         const res=  await postService.editPost(PostIdDetails, updatedPost) 
//         console.log(res)
//          const { req } = postService.getPostByID(PostIdDetails)
//          req.then((res) => {
//              const post = res.data;
//              if (post) {
//                  setImage(post.image);
//                  setName(post.name);
//                  setDescription(post.description);
//                  setPrice(post.price);
//                  setOwner(post.owner);
//                  console.log("updatedPost: " + post.description);
//             }
//          })

//         navigate('/post', { state: { userID, PostIdDetails } });
//     };

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

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="m-3">
//             <h1>Edit Post</h1>
//             <div className="mb-3">
//                 {image && <img src={image} alt="Post" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
//                 {/* <label className="form-label"></label>
//                 <input type="file" className="form-control" {...register("image")}/>
//                 {errors.image && <p className="text-danger">{errors.image.message}</p>} */}
//             </div>

//             <div className="d-flex justify-content-center position-relative">
//                 <img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "230px", width: "230px" }} className="img-fluid" />
//                 <button type="button" className="btn position-absolute bottom-0 end-0" onClick={onImageUploadButtonClick}>
//                     <FontAwesomeIcon icon={faImage} className="fa-xl" />
//                 </button>
//             </div>

//             <input style={{ display: "none" }} {...register("image", { required: "Image is required" })} type="file" onChange={imgSelected} ref={fileInputRef}></input>
//             {/* {errors.image && <p className="text-danger">Image is required</p>} */}

//             <div className="mb-3">
//                 <label className="form-label">Name:</label>
//                 <input type="text" className="form-control" {...register("name")}defaultValue={name} />
//                 {errors.name && <p className="text-danger">{errors.name.message}</p>}
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Description:</label>
//                 <input type="text" className="form-control" {...register("description")}defaultValue={description} />
//                 {errors.description && <p className="text-danger">{errors.description.message}</p>}
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Price:</label>
//                 <input type="number" className="form-control" {...register("price")}defaultValue={price} />
//                 {errors.price && <p className="text-danger">{errors.price.message}</p>}
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Owner ID:</label>
//                 <input type="text" className="form-control" {...register("owner")}defaultValue={owner} />
//                 {errors.owner && <p className="text-danger">{errors.owner.message}</p>}
//             </div>
//             <button type="submit" className="btn btn-primary">Save Changes</button>
//             <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>Delete Post</button>
//         </form>
//     )
// }

// export default EditPost;


import { ChangeEvent, useEffect, useState, useRef } from 'react';
import postService, { CanceledError } from '../services/post-service';
import { PostData } from '../Post';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import avatar from '../assets/avatar.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { uploadPhoto } from '../services/file-service'
import { useParams } from 'react-router-dom';

const schema = z.object({
    name: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    //price: z.string().min(1, { message: 'Price must be a positive number' }),
    price: z.number().min(1, { message: 'Price must be a positive number' }),
    image: z.string().url("Invalid image URL")
});

type FormData = z.infer<typeof schema>;

function EditPost() {
    const navigate = useNavigate();
    //const location = useLocation();
    const userID= localStorage.getItem('userID');
   // const userID = location.state?.userID;
    //const PostIdDetails = location.state?.PostIdDetails;
    const PostIdDetails = useParams().id;

    const [post, setPost] = useState<PostData[]>([])
    const [error, setError] = useState();
    const [image, setImage] =useState('')
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [owner, setOwner] = useState('');
    const [imgSrc, setImgSrc] = useState<File>()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: name,
            description: description,
            price: price,
            image: image
        }
    });

    useEffect(() => {
        const { req, abort } = postService.getPostByID(PostIdDetails!)
        req.then((res) => {
            const post = res.data;
            if (post) {
                setImage(post.image);
                setName(post.name);
                setDescription(post.description);
                setPrice(post.price);
                setOwner(post.owner);
                reset({
                    name: post.name,
                    description: post.description,
                    price: post.price,
                    image: post.image
                });
            }
        }).catch((err) => {
            console.log(err)
            if (err instanceof CanceledError) return
            setError(err.message)
        })
        return () => {
            abort()
        }
    }, [reset])

        const handleDelete = async () => {
        console.log("deleting post: " + name);
        await postService.deletePost(PostIdDetails!)
        const { req } = postService.getPosts()
        req.then((res) => {
            setPost(res.data)
        })
        navigate('/feed');
    };

    const onSubmit = async (data: FormData) => {
        console.log("onSubmit: ");
        let url
        if(imgSrc) {
         url = await uploadPhoto(imgSrc!);
        console.log("upload returned:" + url);
        }
        const updatedPost = {
            name: data.name,
            //image: data.image,
            description: data.description,
            price: Number(data.price),
            owner:owner,
            image: url? url : data.image
        };
        const res=  await postService.editPost(PostIdDetails!, updatedPost) 
        console.log(res)
         const { req } = postService.getPostByID(PostIdDetails!)
         req.then((res) => {
             const post = res.data;
             if (post) {
                 setImage(post.image);
                 setName(post.name);
                 setDescription(post.description);
                 setPrice(post.price);
                 setOwner(post.owner);
                 console.log("updatedPost: " + post.description);
            }
         })

        navigate(`/post/${PostIdDetails}` );
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc(e.target.files[0])
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
            <div>
                <p>Error: You are not logged in.</p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-3">
            <h1>Edit Post</h1>
            <div className="mb-3">
                {image && <img src={image} alt="Post" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
                {/* <label className="form-label"></label>
                <input type="file" className="form-control" {...register("image")}/>
                {errors.image && <p className="text-danger">{errors.image.message}</p>} */}
            </div>

            {/* <div className="d-flex justify-content-center position-relative">
                <img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "230px", width: "230px" }} className="img-fluid" />
                <button type="button" className="btn position-absolute bottom-0 end-0" onClick={onImageUploadButtonClick}>
                    <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
            </div> */}

            <div className="d-flex justify-content-center position-relative">
                {imgSrc && <img src={URL.createObjectURL(imgSrc)} style={{ height: "230px", width: "230px" }} className="img-fluid" />}
                <button type="button" className="btn position-absolute bottom-0 end-0" onClick={onImageUploadButtonClick}>
                    <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
            </div>
            <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>
            {/* <input style={{ display: "none" }} {...register("image", { required: "Image is required" })} type="file" onChange={imgSelected} ref={fileInputRef}></input> */}
            {/* {errors.image && <p className="text-danger">Image is required</p>} */}

            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" {...register("name")}defaultValue={name} />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Description:</label>
                <input type="text" className="form-control" {...register("description")}defaultValue={description} />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
                <div className="mb-3">
                <label className="form-label">Price:</label>
                <input type="number" min="1" className="form-control" {...register("price", { setValueAs: value => parseFloat(value) })} defaultValue={price} />
                {errors.price && <p className="text-danger">{errors.price.message}</p>}
            </div>
                {/* <div className="mb-3">
                <label className="form-label">Price:</label>
                <input type="number" min="1" className="form-control" {...register("price")} defaultValue={price} />
                {errors.price && <p className="text-danger">{errors.price.message}</p>}
            </div> */}
            {/* <div className="mb-3">
                <label className="form-label">Owner ID:</label>
                <input type="text" className="form-control" {...register("owner")}defaultValue={owner} />
                {errors.owner && <p className="text-danger">{errors.owner.message}</p>}
            </div> */}
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>Delete Post</button>
        </form>
    )
}

export default EditPost;


