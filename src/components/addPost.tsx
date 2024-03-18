import  { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { PostData } from '../Post';
import { addPost } from '../services/post-service';
import { uploadPhoto } from '../services/file-service';

export let postID: string;
export let PostIdDetails: string;

const PostSchema = z.object({
  name: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.string().min(1, { message: 'Price must be a positive number' }).transform(parseFloat),
  image: z.string().url({ message: 'Image URL is required' }),
});
type FormData = z.infer<typeof PostSchema>;

function AddPost() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({ resolver: zodResolver(PostSchema) });
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state?.userID;
  const accessToken = localStorage.getItem('accessToken');
  const [imgSrc, setImgSrc] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imgSrc) {
      setValue("image", URL.createObjectURL(imgSrc));
    }
  }, [imgSrc, setValue]);

  if (!accessToken) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundColor: "#f8d7da" }}>
      <p className="mb-4 text-danger">Error: You are not logged in.</p>
      <button onClick={() => navigate('/login')} className="btn btn-primary">Go to Login</button>
    </div>
    );
  }

  const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
    }
  };

  const selectImg = () => {
    fileInputRef.current?.click();
  };

  const addNewPost = async (data: FormData) => {
    if (!imgSrc) {
      alert("Please select an image");
      return;
    }

    const url = await uploadPhoto(imgSrc!);
    
    const post: PostData = {
      ...data,
      image: url,
      owner: userID,
    };
    const res = await addPost(post);
    postID = res.req.data._id ?? '';
    navigate('/feed', { state: { userID: userID } });
  };

  return (
    
    <div className="card">
      <div className="card-body">
      <div style={{ backgroundColor: "#FFF8DC" }}>
        <div className="vstack gap-3 col-md-7 mx-auto">
          <h1 className="text-center">Add New Post:</h1>
          <div className="d-flex justify-content-center position-relative">
            {imgSrc && <img src={URL.createObjectURL(imgSrc)} alt="Post" className="img-thumbnail mb-2" style={{ maxWidth: '200px' }} />}
            <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
              <FontAwesomeIcon icon={faImage} className="fa-xl" />
            </button>
          </div>

          <input style={{ display: "none" }} {...register("image")} type="file" onChange={imgSelected} ref={fileInputRef}></input>
          {errors.image && <p>{errors.image.message}</p>}
          <div className="card p-3">
          
    <form onSubmit={handleSubmit(addNewPost)}>
        <div className="form-floating mb-3 d-flex justify-content-center">
            <input {...register("name")} type="text" className="form-control" id="floatingName" placeholder="" />
            <label htmlFor="floatingName">Title</label>
            {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="form-floating mb-3 d-flex justify-content-center">
            <input {...register("description")} type="text" className="form-control" id="floatingDescription" placeholder="" />
            <label htmlFor="floatingDescription">Description</label>
            {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="form-floating mb-3 d-flex justify-content-center">
            <input {...register("price")} type="number" className="form-control" id="floatingPrice" placeholder="" />
            <label htmlFor="floatingPrice">Price</label>
            {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </div>
    </form>
</div>
        </div>
        </div>
      </div>
    </div>

    
  );
}

export default AddPost;
