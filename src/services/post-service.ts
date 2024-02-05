import apiClient, { CanceledError } from "./api-client"
import { PostData } from '../Post'

export { CanceledError }

const getPostByName = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostData[]>('post', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

}
// const getPostByName = (id: string) => {
//     const abortController = new AbortController();
//     const req = apiClient.get<PostData>(`post/${id}`, { signal: abortController.signal });
//     return { req, abort: () => abortController.abort() };
// }

const editPost = (id: string, postData: PostData) => {
    const abortController = new AbortController()
    const req = apiClient.put<PostData>(`post/${id}`, postData, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export default { getPostByName, editPost}