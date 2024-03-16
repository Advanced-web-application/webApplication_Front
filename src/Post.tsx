
export interface PostData {
    name: string
    description: string
    price: number
    owner: string
    image: string
    comments?: string[];
    _id?: string;
  
}

interface PostProps {
    post: PostData
}

// function Post({ post }: PostProps) {
//     //console.log("comments:" +post.comments)
//     // {post.comments && post.comments.map((comment, index) => {
//     //     console.log("comments" +comment);
//     //     return <p key={index}>{comment}</p>;
//     // })}
//    // console.log("post: " + JSON.stringify(post));
//     return (

//         <div className="card">
//             <img src={post.image} className="card-img-top img-fluid" style={{maxWidth: '200px'}} alt={post.name} />
//             <div className="card-body">
//                 <h5 className="card-title">{post.name}</h5>
//                 <p className="card-text">
//                     <strong>Description:</strong> {post.description}<br />
//                     <strong>Price:</strong> {post.price}<br />
//                     <strong>Owner:</strong> {post.owner}<br />
//                     <strong>Comments:</strong>
//                     {post.comments && post.comments.map((comment, index) => (
//                         <p key={index}>{comment}</p>
//                     ))}
//                 </p>
//             </div>
//         </div>
//     )
// }

function Post({ post }: PostProps) {
    return (
        <div className="d-flex justify-content-center">
        <div className="card text-center">
            <img src={post.image} className="card-img-top img-fluid mx-auto" style={{maxWidth: '400px'}} alt={post.name} />
            <div className="card-body">
                <h5 className="card-title">{post.name}</h5>
                <p className="card-text">
                    <strong>Description:</strong> {post.description}<br />
                    <strong>Price:</strong> {post.price}<br />
                    <strong>Owner:</strong> {post.owner}<br />
                    <strong>Comments:</strong>
                    {post.comments && post.comments.map((comment, index) => {
                        console.log("comment:", comment);
                        return <p key={index}>{comment}</p>;
                    })}
                </p>
            </div>
        </div>
    </div>
    )
}

export default Post