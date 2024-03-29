import apiClient, { CanceledError } from "./api-client"


export { CanceledError }

const getCurrencyRate = () => {
    const abortController = new AbortController()
    const req = apiClient.get(`/restAPI`, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

// export const getCurrencyRate = async () => {
//     const abortController = new AbortController();
//     const makeRequest = async () => {
//       console.log("making the request");
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("No access token found");
//       }
//       return await apiClient.get(`/restAPI`,{
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         },
//         signal: abortController.signal
//       });
//     };
  
//     let req;
//     try {
//       req = await makeRequest();
//     } catch (err) {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("No access token found");
//       }
//       const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
//       const currentTimestamp = Math.floor(Date.now() / 1000);
//       if (tokenPayload.exp && tokenPayload.exp < currentTimestamp) {
//         console.error("error expiration time:" + err);
//         console.error("going to refreshToken");
//         await refreshToken();
//         req = await makeRequest();
//       } else {
//         throw err;
//       }
//     }
  
//     return { req, abort: () => abortController.abort() };
//   };

//   const refreshToken = async () => {
//     console.log("refreshing the Token");
//     const abortController = new AbortController()
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) {
//         throw new Error("No refresh token found");
//     }
//     console.log( refreshToken);
//     const res = await apiClient.get('auth/refreshToken', { 
//         headers: {
//             'Authorization': `Bearer ${refreshToken}`
//         },
//         signal: abortController.signal
//      });
//     const newAccessToken = res.data.accessToken; 
//     const newRefreshToken = res.data.refreshToken; 
//     console.log( res );
//     localStorage.setItem("accessToken", newAccessToken);
//     localStorage.setItem("refreshToken", newRefreshToken);
//     console.log("new access token:" + newAccessToken);
//     console.log("new refresh token:" + newRefreshToken);
//     console.log("refreshing sucsses");
// }

export default { getCurrencyRate}