import apiClient, { CanceledError } from "./api-client"

export interface IUser {
    fullName: string;
    age: number;
    gender: string;
    _id: string;
    image?: string;
    email: string;
    password: string;
    refreshTokens?: string[];
  }

export { CanceledError }
const getUserById = () => {
    const abortController = new AbortController()
    const req = apiClient.get<IUser[]>('user', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

}

export default { getUserById }