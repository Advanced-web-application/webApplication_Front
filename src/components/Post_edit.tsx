import { ChangeEvent, useEffect, useState } from 'react';
import postService, { CanceledError } from '../services/post-service';
import { PostData } from '../Post';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
    name: z.string().min(3, "Name must be longer than 3 characters"),
    description: z.string(),
    price: z.number().positive("Price must be a positive number"),
    owner: z.string().min(3, "Owner ID must be longer than 3 characters"),
});

type FormData = z.infer<typeof schema>;

function EditPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const PostIdEdit = location.state?.PostIdEdit;
    const userID = location.state?.userID;
    const PostIdDetails = location.state?.PostIdDetails;

    const [post, setPost] = useState<PostData[]>([])
    const [error, setError] = useState();
    const [image, setImage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    useEffect(() => {
        const { req, abort } = postService.getPostByID(PostIdDetails)
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

    const handleDelete = async () => {
        console.log("deleting post: " + name);
        await postService.deletePost(PostIdDetails)
        const { req } = postService.getPosts()
        req.then((res) => {
            setPost(res.data)
        })
        navigate('/feed', { state: { userID } });
    };

    const onSubmit = async (data: FormData) => {
        const updatedPost = {
            name: data.name,
            image,
            description: data.description,
            price: data.price,
            owner: data.owner
        };

        await postService.editPost(PostIdDetails, updatedPost)
        navigate('/post', { state: { userID, PostIdDetails } });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-3">
            <h1>Edit Post</h1>
            <div className="mb-3">
                {image && <img src={image} alt="Post" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
                <label className="form-label"></label>
                <input type="file" className="form-control" onChange={(e) => { if (e.target.files != null) setImage(URL.createObjectURL(e.target.files[0])) }} />
            </div>
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" {...register("name")} />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Description:</label>
                <input type="text" className="form-control" {...register("description")} />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Price:</label>
                <input type="number" className="form-control" {...register("price")} />
                {errors.price && <p className="text-danger">{errors.price.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Owner ID:</label>
                <input type="text" className="form-control" {...register("owner")} />
                {errors.owner && <p className="text-danger">{errors.owner.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>Delete Post</button>
        </form>
    )
}

export default EditPost;
