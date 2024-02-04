import apiClient, { CanceledError } from "./api-client"
import { IUser } from '../Profile'

export { CanceledError }

const getUserById = () => {
    const abortController = new AbortController()
    const req = apiClient.get<IUser[]>('user', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

}

export default { getUserById }