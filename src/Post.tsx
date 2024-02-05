
export interface PostData {
    name: string
    description: string
    price: number
    owner: string
    image: string
    comments?: string[];
}

interface PostProps {
    post: PostData
}

function Post({ post }: PostProps) {
    return (

        <div className="card">
            <img src={post.image} className="card-img-top img-fluid" style={{maxWidth: '200px'}} alt={post.name} />
            <div className="card-body">
                <h5 className="card-title">{post.name}</h5>
                <p className="card-text">
                    <strong>Description:</strong> {post.description}<br />
                    <strong>Price:</strong> {post.price}<br />
                    <strong>Owner:</strong> {post.owner}<br />
                    <strong>Comments:</strong>
                    {post.comments && post.comments.map((comment, index) => (
                        <p key={index}>{comment}</p>
                    ))}
                </p>
            </div>
        </div>
    )
}

export default Post