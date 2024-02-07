import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { PostData } from '../Post'
import postService, { CanceledError } from "../services/post-service"
import place_holder_image from '../assets/place_holder_image.png'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { uploadPhoto } from '../services/file-service'

//import Post from "../Post"


//when we will have the post ID, we need to send it as ObjectId (the id itself) and not filter according to name
const handleEdit = (postname: string) => {
    // render to the edit profile page
    console.log(`Moving to post page ${postname}`);
}

//when we will have the postID, we need to send it as ObjectId (the id itself) and not filter according to name

let postID : string;

function Feed() {

    const [post, setPost] = useState<PostData[]>([])
    const [error, setError] = useState()
    
        useEffect(() => {
            const { req, abort } = postService.getPosts()
            req.then((res) => {
                setPost(res.data)
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
            postID = res.data._id ?? '';
            console.log(res)

            // Store tokens in localStorage
            if (res.accessToken) {
                localStorage.setItem('accessToken', res.accessToken);
            }
        if (res.refreshToken) {
            localStorage.setItem('refreshToken', res.refreshToken);
        }
        }
    }


        return (

            <>
            

          
            
            

            <div className="vstack gap-3 col-md-7 mx-auto">
            <h1>Register</h1>

            <div className="d-flex justify-content-center position-relative">
              <img src={imgSrc ? URL.createObjectURL(imgSrc) : place_holder_image} style={{ height: "230px", width: "230px" }} className="img-fluid" />
              <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
                <FontAwesomeIcon icon={faImage} className="fa-xl" />
              </button>
            </div>

            <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>

            <div className="form-floating">
                <input ref={titleInputRef} type="text" className="form-control" id="floatingName" placeholder="" />
                <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating">
                <input ref={descriptionInputRef} type="number" className="form-control" id="floatingAge" placeholder="" />
                <label htmlFor="floatingAge">Age</label>
            </div>
            <div className="form-floating">
                <input ref={priceInputRef} type="text" className="form-control" id="floatingGender" placeholder="" />
                <label htmlFor="floatingGender">Gender</label>
            </div>
            <div className="form-floating">
                <input ref={ownerInputRef} type="text" className="form-control" id="floatingId" placeholder="" />
                <label htmlFor="floatingId">ID</label>
            </div>

            
            <button type="button" className="btn btn-primary" onClick={addNewPost}>Add new post☺</button>

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
                            <button className="btn btn-primary" onClick={() => handleEdit(post.name)}>See Post Details And Comment</button> 
                        </div>
            </div>
        ))}
    </div>

           </>
        )
        
}

export default Feed


function addPost(post: PostData) {
    throw new Error('Function not implemented.')
}

