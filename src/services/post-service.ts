import apiClient, { CanceledError } from "./api-client"
import { PostData } from '../Post'

export { CanceledError }

const getPosts = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostData[]>('post', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

}

//need to use with the PostID!

// const getPostByID = (id: string) => {
//     const abortController = new AbortController();
//     const req = apiClient.get<PostData>(`post/${id}`, { signal: abortController.signal });
//     return { req, abort: () => abortController.abort() };
// }

const editPost = (id: string, postData: PostData) => {
    const abortController = new AbortController()
    const req = apiClient.put<PostData>(`post/${id}`, postData, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const addComment= (id: string, comment: string) => {
    const abortController = new AbortController()
    const req = apiClient.post<PostData>(`post/comment/${id}`, {comment}, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const deletePost = (id: string) => {
    const abortController = new AbortController()
    const req = apiClient.delete<PostData>(`post/${id}`, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

// const addPost = (postData: PostData) => {
//     const abortController = new AbortController()
//     const req = apiClient.post<PostData>('post', postData, { signal: abortController.signal })
//     return { req, abort: () => abortController.abort() }
// }


export const addPost = (postData: PostData) => {
    return new Promise<PostData>((resolve, reject) => {
        apiClient.put<PostData>("/post", postData).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}
export default { getPosts, editPost, addComment, deletePost , addPost}