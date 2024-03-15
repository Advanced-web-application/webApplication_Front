import { useEffect, useState } from 'react'
import { PostData } from '../Post'
import postService, { CanceledError } from "../services/post-service"
import Post from "../Post"
//import { userIDLogin } from '../components/Login_components'
// import { userID } from '../components/Registration'
// import { PostIdDetails } from './Feed'

import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';

export let PostIdEdit : string;
// let ID: string;
// if(userID)
// {
//     ID = userID;
// }
// else
// {
//     ID = userIDLogin;
// }



function PostDetalis() {
    const navigate = useNavigate();
    //const location = useLocation();
    const userID= localStorage.getItem('userID');
    //const userID = location.state?.userID;
    const PostIdDetails = useParams().id;
    console.log("PostIdDetails: " + PostIdDetails);
    //const PostIdDetails = location.state?.PostIdDetails;

    const [post, setPost] = useState<PostData>()
    const [error, setError] = useState()
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (id: string) => async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("adding comment: " + newComment);
        const res =  await postService.addComment(id, newComment);
        const { req } = await postService.getPostByID(PostIdDetails!)
                 const res1 = await req;
                 if (res1) {
                    const post = res1.data;
                    if (post) {
                        const Post = {
                           name: post.name,
                            image: post.image,
                            description: post.description,
                            price: post.price,
                            owner:post.owner,
                            _id: post._id,
                            comments : post.comments
                        };
                        setPost(Post)
                    }
                 }

        console.log(res); 
        console.log("userID: " + userID);  
        navigate('/feed');  
    };

    useEffect(() => {
        const abortController = new AbortController();
         const fetchData = async () => { 
             try {
                 const { req, abort } = await postService.getPostByID(PostIdDetails!)
                 abortController.abort = abort;
                 const res = await req;
                 if (res) {
                    const post = res.data;
                    if (post) {
                        const Post = {
                           name: post.name,
                            image: post.image,
                            description: post.description,
                            price: post.price,
                            owner:post.owner,
                            _id: post._id,
                            comments : post.comments
                        };
                        setPost(Post)
                    }
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
         }
     
     }, [])


        // useEffect(() => {
        //     const { req, abort } = postService.getPostByID(PostIdDetails)
        //     req.then((res) => {
        //             const post = res.data;
        //             if (post) {
        //                 const Post = {
        //                    name: post.name,
        //                     image: post.image,
        //                     description: post.description,
        //                     price: post.price,
        //                     owner:post.owner,
        //                     _id: post._id,
        //                 };
        //                 setPost(Post)
                
        //             }
        //     }).catch((err) => {
        //         console.log(err)
        //         if (err instanceof CanceledError) return
        //         setError(err.message)
        //     })
        //     return () => {
        //         abort()
        //     }
        
        // }, [])

        const handleEdit = (id: string) => {
            PostIdEdit=id;
            // render to the edit Post page
            console.log(`Editing post with name: ${id}`);
            navigate(`/postedit/${PostIdDetails}`);
        }
        const accessToken = localStorage.getItem('accessToken'); 
        return (
            <>
                <h1 className="text-center">Post</h1>
                <div>
                    {error && <p className='text-danger'>{error}</p>}
                </div>
            <div className="p-4">
            {post && (
    <div key={post._id}>
        <Post post={post} />
        <form onSubmit={handleCommentSubmit(post._id ?? '')}>
            <div className="mb-3">
            {accessToken && (
            <input type="text" className="form-control" value={newComment} onChange={(e) => setNewComment(e.target.value)} />)}
            </div>
            {accessToken && (
            <button type="submit" className="btn btn-primary mr-3">Add Comment</button> 
            )}
            {post.owner === userID && <button className="btn btn-success" style={{ marginLeft: '1rem' }} onClick={() => handleEdit(post._id ?? '')}>Edit Post</button>} 
        </form>
    </div>
)}
                {/* {post && (
                    <div key={post._id}>
                        <Post post={post} />
                        <form onSubmit={handleCommentSubmit(post._id ?? '')}>
                            <div className="mb-3">
                            {accessToken && (
                            <input type="text" className="form-control" value={newComment} onChange={(e) => setNewComment(e.target.value)} />)}
                            </div>
                           {accessToken && (
                            <button type="submit" className="btn btn-primary">Add Comment</button> 
                            )}
                            {post.owner === userID && <button className="btn btn-primary" onClick={() => handleEdit(post._id ?? '')}>Edit Post</button>} 
                        </form>
                        
                    </div>
                )} */}
            </div>
           </>
        )
        
}

export default PostDetalis
