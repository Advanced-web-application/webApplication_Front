import apiClient, { CanceledError } from "./api-client"
import { IUser } from '../Profile'

export { CanceledError }

const getUserById = () => {
    const abortController = new AbortController()
    const req = apiClient.get<IUser[]>('user', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

}

// const editUser = () => {
//     const abortController = new AbortController()
//     const req = apiClient.put<IUser[]>('user/:id', { signal: abortController.signal })
//     return { req, abort: () => abortController.abort() }

// }

const editUser = (id: string, userData: IUser) => {
    const abortController = new AbortController()
    const req = apiClient.put<IUser>(`user/${id}`, userData, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export default { getUserById, editUser }