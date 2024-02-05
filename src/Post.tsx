
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
        <div>
            {/* <h1>owner:{post.owner} title:{post.title}</h1>
            <h2>{post.message}</h2> */}
            <h1>Post</h1>
            <h2>name: {post.name}</h2>
            <h2>description: {post.description}</h2>
            <h2>price: {post.price}</h2>
            <h2>owner: {post.owner}</h2>
        </div>
    )
}

export default Post