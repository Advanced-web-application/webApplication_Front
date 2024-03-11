
import apiClient from "./api-client"


export interface IUser {
  email: string,
  password?: string,
  image?: string,
  _id?: string,
  accessToken?: string,
  refreshToken?: string
}


export const postLogout = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      apiClient.get("/auth/logout")
        .then(() => {
          resolve();
        }).catch((error) => {
          reject(error);
        });
    });
  };

  

export default {postLogout}