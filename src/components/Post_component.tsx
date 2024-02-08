import { useEffect, useState } from 'react'
import { PostData } from '../Post'
import postService, { CanceledError } from "../services/post-service"
import Post from "../Post"
import { userIDLogin } from '../components/Login_components'
import { userID } from '../components/Registration'
import { PostIdDetails } from './Feed'

export let PostIdEdit : string;
let ID='';
if(userID)
{
    ID = userID;
}
else
{
    ID = userIDLogin;
}


//when we will have the post ID, we need to send it as ObjectId (the id itself) and not filter according to name
const handleEdit = (id: string) => {
    PostIdEdit=id;
    // render to the edit Post page
    console.log(`Editing post with name: ${id}`);
}

//when we will have the podt, we need to send it as ObjectId (the id itself) and not filter according to name

function PostDetalis() {

    const [post, setPost] = useState<PostData>()
    const [error, setError] = useState()
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (id: string) => (e: React.FormEvent) => {
        e.preventDefault();
        console.log("adding comment: " + newComment);
        const res = postService.addComment(id, newComment);
        console.log(res); 
        console.log("ID: " + ID);    
    };


    // const handleCommentSubmit = (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     console.log("adding comment: " + newComment);

    //     //NEED TO ADD USING THE POSTID:
    //    // const res =  postService.addComment(PostId, newComment)
    //    // console.log(res);

    // };

        useEffect(() => {
            const { req, abort } = postService.getPostByID(PostIdDetails)
            req.then((res) => {
                    const post = res.data;
                    if (post) {
                        const Post = {
                           name: post.name,
                            image: post.image,
                            description: post.description,
                            price: post.price,
                            owner:post.owner,
                            _id: post._id,
                        };
                        setPost(Post)
                
                    }
            }).catch((err) => {
                console.log(err)
                if (err instanceof CanceledError) return
                setError(err.message)
            })
            return () => {
                abort()
            }
        
        }, [])
        return (
            <>
                <h1>Post</h1>
                <div>
                    {error && <p className='text-danger'>{error}</p>}
                </div>
            <div className="p-4">
                {post && (
                    <div key={post._id}>
                        <Post post={post} />
                        <form onSubmit={handleCommentSubmit(post._id ?? '')}>
                            <div className="mb-3">
                                <label className="form-label">New Comment:</label>
                                <input type="text" className="form-control" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Comment</button>
                            {post.owner === ID && <button className="btn btn-primary" onClick={() => handleEdit(post._id ?? '')}>Edit Post</button>} 
                        </form>
                        
                    </div>
                )}
            </div>
           </>
        )
        
}

export default PostDetalis
