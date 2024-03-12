
import apiClient from "./api-client"


export interface IUser {
  email: string,
  password?: string,
  image?: string,
  _id?: string,
  accessToken?: string,
  refreshToken?: string
}


export const postLogout = async (): Promise<IUser> => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
    return new Promise<IUser>((resolve, reject) => {
      apiClient.get<IUser>("/auth/logout")
        .then((response) => { 
          resolve(response.data);
        }).catch((error) => {
          reject(error);
        });
    });
  };

  

export default {postLogout}