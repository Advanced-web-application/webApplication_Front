import apiClient, { CanceledError } from "./api-client"
import { PostData } from '../Post'

export { CanceledError }

const getPostByName = () => {
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

export default { getPostByName, editPost, addComment}