import { useEffect, useState } from 'react'
import { PostData } from '../Post'
import postService, { CanceledError } from "../services/post-service"
import Post from "../Post"


//when we will have the post ID, we need to send it as ObjectId (the id itself) and not filter according to name
const handleEdit = (postname: string) => {
    // render to the edit profile page
    console.log(`Moving to post page ${postname}`);
}

//when we will have the postID, we need to send it as ObjectId (the id itself) and not filter according to name



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
        return (
            <>
             <h1>See Our Posts...</h1>
            <div>
                {error && <p className='text-danger'>{error}</p>}
            </div>
               
            <div className="p-4">
                {post && post.map(post => (
                    <div key={post.name} style={{ marginBottom: '20px' }}>
                        <Post post={post} />
                        <button className="btn btn-primary" onClick={() => handleEdit(post.name)}>See Post Details</button>  
                    </div>
                ))}
            </div>

           </>
        )
        
}

export default Feed
