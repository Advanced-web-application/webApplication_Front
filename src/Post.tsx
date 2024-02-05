
export interface PostData {
    name: string
    description: string
    price: number
    owner: string
    image: string
}

interface PostProps {
    post: PostData
}

function Post({ post }: PostProps) {
    return (
        // <div>
        //     {/* <h1>owner:{post.owner} title:{post.title}</h1>
        //     <h2>{post.message}</h2> */}
        //     <h1>Post</h1>
        //     <h2>name: {post.name}</h2>
        //     <h2>description: {post.description}</h2>
        //     <h2>price: {post.price}</h2>
        //     <h2>owner: {post.owner}</h2>
        // </div>

        <div className="card">
        <img src={post.image} className="card-img-top img-fluid" style={{maxWidth: '200px'}} alt={post.name} />
        <div className="card-body">
            <h5 className="card-title">{post.name}</h5>
            <p className="card-text">
                <strong>Description:</strong> {post.description}<br />
                <strong>Price:</strong> {post.price}<br />
                <strong>owner:</strong> {post.owner}<br />
            </p>
        </div>
    </div>
    )
}

export default Post