import { CredentialResponse } from "@react-oauth/google"
import apiClient from "./api-client"
import axios from "axios";

export interface IUser {
    email: string,
    password?: string,
    image?: string,
    _id?: string,
    accessToken?: string,
    refreshToken?: string
}

export const getUser = async (): Promise<IUser> => {
    //const response = await axios.get<IUser>('/auth/user');
    return new Promise<IUser>((resolve, reject) => {
        apiClient.get<IUser>("/auth/user").then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
    //return response.data;
}

export const updateUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        apiClient.put<IUser>("/auth/user", user).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const registrUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("Registering user...")
        console.log(user)
        apiClient.post("/auth/register", user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const googleSignin = (credentialResponse: CredentialResponse) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("googleSignin ...")
        apiClient.post("/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}