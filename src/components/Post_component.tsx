import { useEffect, useState } from 'react'
import { PostData } from '../Post'
import postService, { CanceledError } from "../services/post-service"
import Post from "../Post"


//when we will have the post ID, we need to send it as ObjectId (the id itself) and not filter according to name
const handleEdit = (postname: string) => {
    // render to the edit profile page
    console.log(`Editing user with name: ${postname}`);
}

//when we will have the podt, we need to send it as ObjectId (the id itself) and not filter according to name

function PostDetalis() {

    const [post, setPost] = useState<PostData[]>([])
    const [error, setError] = useState()
    const [newComment, setNewComment] = useState('');


    const handleCommentSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log("adding comment: " + newComment);

        // NEED TO ADD USING THE POSTID:
        // const res =  postService.addComment(PostId, newComment)
        // console.log(res);

    };


        useEffect(() => {
            const { req, abort } = postService.getPostByName()
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
        return (
            <>
             <h1>Post</h1>
            <div>
                {error && <p className='text-danger'>{error}</p>}
            </div>
            
            {/* <div className="p-4">
                {post && 
                    <div key={post.name}>
                        <Post post={post} />     
                        <button className="btn btn-primary" onClick={() => handleEdit(post.name)}>Edit Profile</button>
                    </div>
                }
            </div> */}

            <div className="p-4">
                {post && post.filter(post => post.name === 'test post').map(post => (
                    <div key={post.name}>
                        <Post post={post} />
                        <button className="btn btn-primary" onClick={() => handleEdit(post.name)}>Edit Post</button>
                        
                        <form onSubmit={handleCommentSubmit}>
                        <div className="mb-3">
                            <label className="form-label">New Comment:</label>
                            <input type="text" className="form-control" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Comment</button>
                    </form>
                    </div>
                ))}
            </div> 

            
  
           </>
        )
        
}

export default PostDetalis
