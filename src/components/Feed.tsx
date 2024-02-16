import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { PostData } from '../Post'
import postService, { CanceledError, addPost } from "../services/post-service"
import place_holder_image from '../assets/place_holder_image.png'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { uploadPhoto } from '../services/file-service'

import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { postLogout } from '../services/logout-service'

//import Post from "../Post"
export let postID : string;
export let PostIdDetails : string;


//when we will have the post ID, we need to send it as ObjectId (the id itself) and not filter according to name


//when we will have the postID, we need to send it as ObjectId (the id itself) and not filter according to name



function Feed() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;

    const [post, setPost] = useState<PostData[]>([])
    const [error, setError] = useState()
    
        useEffect(() => {
            const { req, abort } = postService.getPosts()
            req.then((res) => {
                setPost(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
                if (err instanceof CanceledError) return
                setError(err.message)
            })
            return () => {
                abort()
            }
        
        }, [])

    const [imgSrc, setImgSrc] = useState<File>()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const priceInputRef = useRef<HTMLInputElement>(null);
    const ownerInputRef = useRef<HTMLInputElement>(null);
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
    
    const addNewPost = async () => {
        const url = await uploadPhoto(imgSrc!);
        console.log("upload returned:" + url);
        if (titleInputRef.current?.value &&  descriptionInputRef.current?.value &&
            priceInputRef.current?.value&& ownerInputRef.current?.value) {
            const post : PostData = {
                name: titleInputRef.current?.value,
                description: descriptionInputRef.current?.value,
                price: Number(priceInputRef.current?.value),
                owner: ownerInputRef.current?.value,    
                image: url
            }
            const res = await addPost(post)
            postID = res._id ?? '';
            console.log("postID: " + postID);
            console.log(res)
            
        }
    }

    const handleEdit = (id: string) => { 
       
        // render to the edit profile page
        PostIdDetails = id;
        console.log(`Moving to post page ${PostIdDetails}`);
        navigate('/post' , { state: { userID, PostIdDetails } });
    }

    const handleButtonClick = () => {
        console.log(`userID: ${userID}`);
        navigate('/profile', { state: { userID } });
      };

      const handleLogout = () => {
        console.log("logging out");
        postLogout();
        //navigate('/');
      };
      const handleCurrancyConvert = () => {
        console.log("CurrancyConvert");
        navigate('/CurrancyConvert');
      };


 return (
            <>

            <div className="card">
                <div className="card-body">
                    <div className="vstack gap-3 col-md-7 mx-auto">
                        <h1>add new post:</h1>
                        <div className="d-flex justify-content-center position-relative">
                            <img src={imgSrc ? URL.createObjectURL(imgSrc) : place_holder_image} style={{ height: "230px", width: "230px" }} className="img-fluid" />
                            <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
                                <FontAwesomeIcon icon={faImage} className="fa-xl" />
                            </button>
                        </div>

                        <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>

                        <div className="form-floating">
                            <input ref={titleInputRef} type="text" className="form-control" id="floatingName" placeholder="" />
                            <label htmlFor="floatingName">Title</label>
                        </div>
                        <div className="form-floating">
                            <input ref={descriptionInputRef} type="text" className="form-control" id="floatingdescription" placeholder="" />
                            <label htmlFor="floatingdescription">description</label>
                        </div>
                        <div className="form-floating">
                            <input ref={priceInputRef} type="number" className="form-control" id="floatingprice" placeholder="" />
                            <label htmlFor="floatingprice">Price</label>
                        </div>
                        <div className="form-floating">
                            <input ref={ownerInputRef} type="text" className="form-control" id="floatingowner" placeholder="" />
                            <label htmlFor="floatingowner">owner</label>
                        </div>   
                        <button type="button" className="btn btn-primary" onClick={addNewPost}>Add new post☺</button>
                    </div>
                </div>
            </div>

             <h1>See Our Posts...</h1>
            <div>
                {error && <p className='text-danger'>{error}</p>}
            </div>
               
            {/* <div className="p-4">
                {post && post.map(post => (
                    <div key={post.name} style={{ marginBottom: '20px' }}>
                        <Post post={post} />
                        <button className="btn btn-primary" onClick={() => handleEdit(post.name)}>See Post Details</button>  
                    </div>
                ))}
            </div> */}

            <div className="container">
            <button onClick={handleButtonClick} className="btn btn-primary">
                Go to Profile
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
                Logout
            </button>
            <button onClick={handleCurrancyConvert} className="btn btn-secondary">
             Currancy Convertion
            </button>
                {post.map((post, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-header">
                            <h2 className="card-title">{post.name}</h2>
                        </div>
                        <div className="card-body">
                            <p><img src={post.image} className="card-img-top img-fluid" style={{maxWidth: '200px'}}  /></p>
                            <p><strong>Description:</strong> {post.description}</p>
                            <p><strong>Price:</strong> {post.price}</p>
                            <p><strong>Owner:</strong> {post.owner}</p>
                            <p><strong>Number of Comments:</strong> {post.comments ? post.comments.length : 0}</p>
                            <button className="btn btn-primary" onClick={() => handleEdit(post._id ?? '')}>See Post Details And Comment</button> 
                        </div>
                    </div>
                ))}
    </div>

           </>
        )
        
}

export default Feed


