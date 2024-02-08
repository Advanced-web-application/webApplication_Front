
import { ChangeEvent, useEffect, useState } from 'react';
import postService , { CanceledError } from '../services/post-service';
import { PostData } from '../Post';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PostIdEdit } from '../components/Post_component'



//when we will have the podt, we need to send it as ObjectId (the id itself) and not filter according to name

function EditPost() {
   
    const [error, setError] = useState()
    const [image, setImage] =useState('')
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [owner, setOwner] = useState('');

    useEffect(() => {
        const { req, abort } = postService.getPostByID(PostIdEdit)
        req.then((res) => {
            const post = res.data;
            if (post) {
                setImage(post.image);
                setName(post.name);
                setDescription(post.description);
                setPrice(post.price);
                setOwner(post.owner);
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

    const handleDelete = () => {
        console.log("deleting post: " + name );
        postService.deletePost(name) //needs to get the post id...      
    };



    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const updatedPost = {
            name,
            image,
            description,
            price,
            owner
        };

        const res =  postService.editPost(name, updatedPost) //needs to get the post id...
        console.log(res);

    };
    return (
        <form onSubmit={handleSubmit} className="m-3">
        <h1>Edit Post</h1>
        <div className="mb-3">
                    {image && <img src={image} alt="Post" className="img-thumbnail mb-2" style={{maxWidth: '200px'}} />}
                    <label className="form-label"></label>
                    <input type="file" className="form-control" onChange={(e) =>  {if(e.target.files!=null) setImage(URL.createObjectURL(e.target.files[0]))}} />
                </div>
        {}
        <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
            <label className="form-label">Description:</label>
            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
            <label className="form-label">Price:</label>
            <input type="number" className="form-control" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
        <div className="mb-3">
            <label className="form-label">Owner ID:</label>
            <input type="text" className="form-control" value={owner} onChange={(e) => setOwner(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>

    
        <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>Delete Post</button>

        
    </form>
    )

}

export default EditPost;