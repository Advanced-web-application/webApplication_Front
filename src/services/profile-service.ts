import apiClient, { CanceledError } from "./api-client"
import { IUser } from '../Profile'

export { CanceledError }

// const getUserById = () => {
//     const abortController = new AbortController()
//     const req = apiClient.get<IUser[]>('user', { signal: abortController.signal })
//     return { req, abort: () => abortController.abort() }

// }
// const getUserById = (id: string) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) {
//         throw new Error("No access token found");
//     }
//     const abortController = new AbortController();
//     const req = apiClient.get<IUser>(`user/${id}`, { signal: abortController.signal });
//     return { req, abort: () => abortController.abort() };
// }

// const getUserById = (id: string) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) {
//         throw new Error("No access token found");
//     }
//     const abortController = new AbortController();
//     const req = apiClient.get<IUser>(`user/${id}`, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         },
//         signal: abortController.signal
//     });
//     return { req, abort: () => abortController.abort() };
// }

// const getUserById =  (id: string) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) {
//         throw new Error("No access token found");
//     }
//     const abortController = new AbortController();
//     try {
//         const req = apiClient.get<IUser>(`user/${id}`, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             },
//             signal: abortController.signal
//         });
//         return { req, abort: () => abortController.abort() };
//     } catch (err) {
//         console.error("error:" + err);
//         refreshToken(); 
//         const newAccessToken = localStorage.getItem("accessToken");
//         const req = apiClient.get<IUser>(`user/${id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${newAccessToken}`
//                 },
//                 signal: abortController.signal
//             });
//                 return { req, abort: () => abortController.abort() };
//         }    
    
// }


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
    }).catch(err => {
        //if(err.status !== 401) throw err;    // NEED TO UNDERSTAND HOW TO KNOW IF THE ERROR IS EXPIRATION TIME
        if(err.status === 401){
            console.error("error expiration time:" + err);
            refreshToken(); 
            const newAccessToken = localStorage.getItem("accessToken");
            return apiClient.get<IUser>(`user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${newAccessToken}`
                },
                signal: abortController.signal
            });
        }
        else{
            throw err
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
}

const editUser = (id: string, userData: IUser) => {
    const abortController = new AbortController()
    const req = apiClient.put<IUser>(`user/${id}`, userData, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export default { getUserById, editUser}