// import { ChangeEvent, useEffect, useRef, useState } from 'react'
// import { PostData } from '../Post'
// import postService, { CanceledError, addPost } from "../services/post-service"
// import place_holder_image from '../assets/place_holder_image.png'
// import { faImage } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { uploadPhoto } from '../services/file-service'

// import { useNavigate } from 'react-router-dom'
// import { useLocation } from 'react-router-dom';
// import logoutService from '../services/logout-service'

// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// export let postID : string;
// export let PostIdDetails : string;

// // const PostSchema = z.object({
// //     name: z.string().min(1, { message: 'Title is required' }),
// //     description: z.string().min(1, { message: 'Description is required' }),
// //     //price: z.number().min(0, { message: 'Price must be a positive number' }).transform(parseFloat),
// //     price: z.string().min(1, { message: 'Price must be a positive number' }).transform(parseFloat),
// //     owner: z.string().min(1, { message: 'Owner is required' }),
// // });
// // type FormData = z.infer<typeof PostSchema>

// function Feed() {
//     //const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(PostSchema) })
//     const navigate = useNavigate();
//     const location = useLocation();
//     const userID = location.state?.userID;
//     console.log("userID: " + userID);

//     const [post, setPost] = useState<PostData[]>([])
//     const [error, setError] = useState()
//     const [viewMyPosts, setViewMyPosts] = useState<boolean>(false);
    
//     useEffect(() => {
//         const { req, abort } = postService.getPosts()
//         req.then((res) => {
//             setPost(res.data)
//             console.log(res.data)
//         }).catch((err) => {
//             console.log(err)
//             if (err instanceof CanceledError) return
//             setError(err.message)
//         })
//         return () => {
//             abort()
//         }
    
//     }, [])

//     // const [imgSrc, setImgSrc] = useState<File>()
//     // const fileInputRef = useRef<HTMLInputElement>(null)
//     // const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
//     //     console.log(e.target.value)
//     //     if (e.target.files && e.target.files.length > 0) {
//     //         setImgSrc(e.target.files[0])
//     //     }
//     // }
//     // const selectImg = () => {
//     //     console.log("Selecting image...")
//     //     fileInputRef.current?.click()
//     // }
    

//     // const addNewPost = async (data: FormData) => {
//     //     const url = await uploadPhoto(imgSrc!);
//     //     console.log("upload returned:" + url);
//     //     const post : PostData = {
//     //         ...data,
//     //         image: url
//     //     }
//     //     const res = await addPost(post)
//     //     postID = res.req.data._id ?? '';
//     //     console.log("postID: " + postID);
//     //     console.log(res)
//     // }

//     const handleEdit = (id: string | undefined) => { 
//         PostIdDetails = id ?? '';
//         console.log(`Moving to post page ${PostIdDetails}`);
//         navigate('/post' , { state: { userID, PostIdDetails } });
//     }

//     const handleButtonClick = () => {
//         console.log(`userID: ${userID}`);
//         navigate('/profile', { state: { userID } });
//     };

   
//     const handleAddNewPost = () => {
//         console.log(`userID: ${userID}`);
//         navigate('/addPost', { state: { userID } });
//     };

//     const accessToken = localStorage.getItem('accessToken'); // Replace with how you access your access token
    
//     const handleLogout = () => {
//         if(accessToken){
//         console.log("logging out");
//         logoutService.postLogout();
//         localStorage.removeItem('userID');
//         navigate('/login' , {replace: true});
//         }
//     };

//     const handleCurrancyConvert = () => {
//         console.log("CurrancyConvert");
//         navigate('/CurrancyConvert' , { state: { userID } });
//     };

    

// const handleFilterMyPosts = () => {
//     if (accessToken) {
//         setViewMyPosts(!viewMyPosts);
//     }
// };


//     return (
//         <>
//         {/* <div className="card">
//           <div className="card-body">
//             <div className="vstack gap-3 col-md-7 mx-auto">
//               <h1>add new post:</h1>
//               <div className="d-flex justify-content-center position-relative">
//                 <img src={imgSrc ? URL.createObjectURL(imgSrc) : place_holder_image} style={{ height: "50px", width: "50px" }} className="img-fluid" />
//                 <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
//                 <FontAwesomeIcon icon={faImage} className="fa-xl" />
//                 </button>
//             </div>

//               <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>

//               <form onSubmit={handleSubmit(addNewPost)}>
//                 <div className="form-floating">
//                   <input {...register("name")} type="text" className="form-control" id="floatingName" placeholder="" />
//                   <label htmlFor="floatingName">Title</label>
//                   {errors.name && <p>{errors.name.message}</p>}
//                 </div>
//                 <div className="form-floating">
//                   <input {...register("description")} type="text" className="form-control" id="floatingDescription" placeholder="" />
//                   <label htmlFor="floatingDescription">Description</label>
//                   {errors.description && <p>{errors.description.message}</p>}
//                 </div>
//                 <div className="form-floating">
//                   <input {...register("price")} type="number" className="form-control" id="floatingPrice" placeholder="" />
//                   <label htmlFor="floatingPrice">Price</label>
//                   {errors.price && <p>{errors.price.message}</p>}
//                 </div>
//                 <div className="form-floating">
//                   <input {...register("owner")} type="text" className="form-control" id="floatingOwner" placeholder="" />
//                   <label htmlFor="floatingOwner">Owner</label>
//                   {errors.owner && <p>{errors.owner.message}</p>}
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit</button>
//               </form>
//             </div>
//           </div>
//         </div> */}
//         <button onClick={handleButtonClick} className="btn btn-secondary">
//             Profile
//         </button>
//         <button onClick={handleAddNewPost} className="btn btn-secondary">
//             Add new post
//         </button>
//         {accessToken && (
//         <button onClick={handleLogout} className="btn btn-secondary">
//             Logout
//         </button>
//         )}
//         <button onClick={handleCurrancyConvert} className="btn btn-secondary">
//             CurrancyConvert
//         </button>
//         {accessToken && (
//         <button onClick={handleFilterMyPosts} className="btn btn-secondary">
//             {viewMyPosts ? "View All Posts" : "View My Posts"}
//         </button>
//         )}
//         {post.filter(p => !viewMyPosts || p.owner === userID).map((post, index) => (
//     <div className="card" key={index}>
//         <img src={post.image} className="card-img-top" alt="..." style={{ maxHeight: "200px", maxWidth: "200px" }} />
//         <div className="card-body">
//             <h5 className="card-title">{post.name}</h5>
//             <p className="card-text">{post.description}</p>
//             <p className="card-text">{post.price}</p>
//             <p className="card-text">{post.owner}</p>
//             <p className="card-text">{post.comments?.length}</p>
//             <button onClick={() => handleEdit(post._id)} className="btn btn-primary">See Post Details</button>    
//         </div>
//     </div>
// ))}

//         </>
//     )
// }

// export default Feed


import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { PostData } from '../Post';
import postService, { CanceledError, addPost } from "../services/post-service";
import place_holder_image from '../assets/place_holder_image.png';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadPhoto } from '../services/file-service';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logoutService from '../services/logout-service';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define postID and PostIdDetails if needed elsewhere
export let postID: string;
export let PostIdDetails: string;



function Feed() {
    //const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(PostSchema) })
    const navigate = useNavigate();
    //const location = useLocation();
    //const userID = location.state?.userID;
    const userID= localStorage.getItem('userID');

    //const userID = ID !== "" ? ID : location.state?.userID;
    console.log("userID: " + userID);

    const [post, setPost] = useState<PostData[]>([]);
    const [error, setError] = useState();
    const [viewMyPosts, setViewMyPosts] = useState<boolean>(false);

    useEffect(() => {
        const { req, abort } = postService.getPosts();
        req.then((res) => {
            setPost(res.data);
        }).catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
        });
        return () => {
            abort();
        };
    }, []);

    const handleEdit = (id: string | undefined) => {
        PostIdDetails = id ?? '';
        //navigate('/post', { state: { userID, PostIdDetails } });
        navigate(`/post/${PostIdDetails}` );
    };

    const handleButtonClick = () => {
        navigate('/profile');
    };

    const handleAddNewPost = () => {
        navigate('/addPost' );
    };

    const handleLogout = () => {
        console.log("logging out");
        logoutService.postLogout();
        //localStorage.removeItem('userID');
        localStorage.setItem('logout', 'true');
        navigate('/login', { replace: true });
    };

    const handleCurrancyConvert = () => {
        navigate('/CurrancyConvert');
    };

    const handleFilterMyPosts = () => {
        if (accessToken) {
            setViewMyPosts(!viewMyPosts);
        }
    };

    const accessToken = localStorage.getItem('accessToken');

    return (
        <>
<div className="p-3 mb-4 border rounded" style={{ backgroundColor: 'lightgray' }}>
<h4 className="text-center">Navigate in our website:</h4>
<div className="d-flex justify-content-center">
{!accessToken &&(<button onClick={() => navigate('/login')} className="btn btn-primary mb-4"  style={{ marginLeft: '1rem' ,backgroundColor: 'brown', color: 'white'}}>Go to Login </button>)}

{accessToken && (
<button onClick={handleButtonClick} className="btn btn-primary mb-4"  style={{ marginLeft: '1rem',backgroundColor: 'brown', color: 'white' }}>
    Profile
</button>
)}
{accessToken && (
<button onClick={handleAddNewPost} className="btn btn-primary mb-4"  style={{ marginLeft: '1rem',backgroundColor: 'brown', color: 'white' }}>
    Add new post
</button>
)}
{accessToken && (
    <button onClick={handleLogout} className="btn btn-primary mb-4"  style={{ marginLeft: '1rem',backgroundColor: 'brown', color: 'white' }}>
        Logout
    </button>
)}
<button onClick={handleCurrancyConvert} className="btn btn-primary mb-4" style={{ marginLeft: '1rem', backgroundColor: 'brown', color: 'white' }}>
    CurrencyConvert
</button>
{accessToken && (
    <button onClick={handleFilterMyPosts} className="btn btn-primary mb-4" style={{ marginLeft: '1rem',backgroundColor: 'brown', color: 'white' }}>
        {viewMyPosts ? "View All Posts" : "View My Posts"}
    </button>
)}
</div>
</div>

<div className="text-center my-5">
    <h1 className="display-4">See People Posts:</h1>
</div>
            {/* {!accessToken &&(<button onClick={() => navigate('/login')} className="btn btn-secondary">Go to Login </button>)}

            {accessToken && (
            <button onClick={handleButtonClick} className="btn btn-secondary">
                Profile
            </button>
            {accessToken  && (
            <button onClick={handleAddNewPost} className="btn btn-secondary">
                Add new post
            </button>
            )}
            {accessToken  && (
                <button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                </button>
            )}
            <button onClick={handleCurrancyConvert} className="btn btn-secondary">
                CurrencyConvert
            </button>
            {accessToken  && (
                <button onClick={handleFilterMyPosts} className="btn btn-secondary">
                    {viewMyPosts ? "View All Posts" : "View My Posts"}
                </button>
            )} */}
            { post.length === 0 && (
                <div className="alert alert-info" role="alert">
                    No posts available...
                </div>
            )}
            
           
           {post.filter(p => !viewMyPosts || p.owner === userID).map((post, index) => (
             <div className="d-flex justify-content-center">
        <div className="card m-2" style={{ width: "40rem" }} key={index}>
        <img src={post.image} className="card-img-top" alt="..." style={{ maxHeight: "200px", maxWidth: "200px", objectFit: "cover" }} />
        <div className="card-body">
            <h5 className="card-title"><strong>Title:</strong> {post.name}</h5>
            <p className="card-text"><strong>Description:</strong> {post.description}</p>
            <p className="card-text"><strong>Price:</strong> {post.price}</p>
            <p className="card-text"><strong>Owner:</strong> {post.owner}</p>
            <p className="card-text"> <strong>Number Of Comments:</strong> {post.comments?.length}</p>
            <button onClick={() => handleEdit(post._id)} className="btn" style={{ backgroundColor: 'brown', color: 'white' }}>See Post Details</button>
        </div>
        
     </div>
     </div>
   
))}

            {/* {post.filter(p => !viewMyPosts || p.owner === userID).map((post, index) => (
                <div className="card" key={index}>
                    <img src={post.image} className="card-img-top" alt="..." style={{ maxHeight: "200px", maxWidth: "200px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{post.name}</h5>
                        <p className="card-text">{post.description}</p>
                        <p className="card-text">{post.price}</p>
                        <p className="card-text">{post.owner}</p>
                        <p className="card-text">{post.comments?.length}</p>
                        <button onClick={() => handleEdit(post._id)} className="btn btn-primary">See Post Details</button>
                    </div>
                </div>
            ))} */}
        </>
    )
}

export default Feed;
