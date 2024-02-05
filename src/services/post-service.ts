import apiClient, { CanceledError } from "./api-client"
import { PostData } from '../Post'

export { CanceledError }

const getPostByName = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostData[]>('post', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

}

const editPost = (name: string, postData: PostData) => {
    const abortController = new AbortController()
    const req = apiClient.put<PostData>(`post/${name}`, postData, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export default { getPostByName, editPost}