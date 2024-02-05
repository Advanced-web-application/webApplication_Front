import { useEffect, useState } from 'react'
import { PostData } from '../Post'
import postService, { CanceledError } from "../services/post-service"
import Post from "../Post"

//TODO: Add the handleEdit function here OF POST
const handleEdit = (postname: string) => {
    // render to the edit profile page
    console.log(`Editing user with name: ${postname}`);
}



function PostDetalis() {
        const [post, setPost] = useState<PostData[]>([])
        const [error, setError] = useState()
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
            
        

            <div className="p-4">
                {post && post.filter(post => post.name === 'test post').map(post => (
                    <div key={post.name}>
                        <Post post={post} />
                        <button className="btn btn-primary" onClick={() => handleEdit(post.name)}>Edit Post</button>
                    </div>
                ))}
            </div> 
  
           </>
        )
        
}

export default PostDetalis
