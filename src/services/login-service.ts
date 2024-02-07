
import apiClient from "./api-client"


// export interface ILogin {
//   email: string;
//   password: string;
// }

export interface IUser {
  email: string,
  password?: string,
  image?: string,
  _id?: string,
  accessToken?: string,
  refreshToken?: string
}

// export const postLogIn = async (): Promise<ILogin> => {
//     //const response = await axios.get<IUser>('/auth/user');
//     return new Promise<ILogin>((resolve, reject) => {
//         apiClient.post<ILogin>("/auth/login").then((response) => {
//             resolve(response.data)
//         }).catch((error) => {
//             reject(error)
//         })
//     })
//     //return response.data;
// }

export const postLogIn = async (email: string, password: string): Promise<ILogin> => {
  return new Promise<IUser>((resolve, reject) => {
      apiClient.post<IUser>("/auth/login", { email, password })
          .then((response) => {
              resolve(response.data)
          }).catch((error) => {
              reject(error)
          })
  })
}
