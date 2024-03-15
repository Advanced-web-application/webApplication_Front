
import apiClient from "./api-client"


export interface IUser {
  email: string,
  password?: string,
  image?: string,
  _id?: string,
  accessToken?: string,
  refreshToken?: string
}


export const postLogout = async () => {
  const abortController = new AbortController()
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
      throw new Error("No refresh token found");
  }
  console.log( refreshToken);
  const res = await apiClient.get('auth/logout', { 
      headers: {
          'Authorization': `Bearer ${refreshToken}`
      },
      signal: abortController.signal
   });
   localStorage.removeItem('accessToken');
   localStorage.removeItem('refreshToken');
   localStorage.removeItem('userID');






  // localStorage.removeItem('accessToken');
  // localStorage.removeItem('refreshToken');
  //   return new Promise<IUser>((resolve, reject) => {
  //     apiClient.get<IUser>("/auth/logout")
  //       .then((response) => { 
  //         resolve(response.data);
  //       }).catch((error) => {
  //         reject(error);
  //       });
  //   });
  };

  

export default {postLogout}