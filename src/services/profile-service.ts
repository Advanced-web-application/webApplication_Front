import apiClient, { CanceledError } from "./api-client"
import { IUser } from '../Profile'
import jwt_decode from 'jwt-decode';
//import { Id } from '../components/Profile_component';
import { userIDLogin } from '../components/Login_components'
import { userID } from '../components/Registration'

export { CanceledError }

let ID='';
if(userID)
{
    ID = userID;
}
else
{
    ID = userIDLogin;
}


const getUserById = (id: string) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        throw new Error("No access token found");
    }
    const abortController = new AbortController();
    const req = apiClient.get<IUser>(`user/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        signal: abortController.signal

    })
    .catch( err => {
            const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (tokenPayload.exp && tokenPayload.exp < currentTimestamp) {
                console.error("error expiration time:" + err);
                console.error("going to refreshToken");
                refreshToken(); 
                // return getUserById(id);
                const newAccessToken = localStorage.getItem("accessToken");
                return apiClient.get<IUser>(`user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${newAccessToken}`
                },
                signal: abortController.signal
            });
        } else {
            throw err;
        }
        
    });
    
    console.log("getting the user sucsses");
    return { req, abort: () => abortController.abort() };
}

const refreshToken = async () => {
    console.log("refreshing the Token");
    const abortController = new AbortController()
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("No refresh token found");
    }
    const res = await apiClient.get('auth/refreshToken', { 
        headers: {
            'Authorization': `Bearer ${refreshToken}`
        },
        signal: abortController.signal
     });
    const newAccessToken = res.data.accessToken; 
    const newRefreshToken = res.data.refreshToken; 
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    console.log("new access token:" + newAccessToken);
    console.log("new refresh token:" + newRefreshToken);
    console.log("refreshing sucsses");
}

const editUser = (id: string, userData: IUser) => {
    const abortController = new AbortController()
    const req = apiClient.put<IUser>(`user/${id}`, userData, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export default { getUserById, editUser}




