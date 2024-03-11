import apiClient, { CanceledError } from "./api-client"
import { PostData } from '../Post'

export { CanceledError }

const getPosts = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostData[]>('post', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

}

//need to use with the PostID!

const getPostByID = (id: string) => {
    const abortController = new AbortController();
    const req = apiClient.get<PostData>(`post/${id}`, { signal: abortController.signal });
    return { req, abort: () => abortController.abort() };
}

// const editPost = (id: string, postData: PostData) => {
//     const abortController = new AbortController()
//     const req = apiClient.put<PostData>(`post/${id}`, postData, { signal: abortController.signal })
//     return { req, abort: () => abortController.abort() }
// }

export const editPost = async (id: string, postData: PostData) => {
  const abortController = new AbortController();
  const makeRequest = async () => {
    console.log("making the request");
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return await apiClient.put<PostData>(`post/${id}`, postData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      signal: abortController.signal
    });
  };

  let req;
  try {
    req = await makeRequest();
  } catch (err) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (tokenPayload.exp && tokenPayload.exp < currentTimestamp) {
      console.error("error expiration time:" + err);
      console.error("going to refreshToken");
      await refreshToken();
      req = await makeRequest();
    } else {
      throw err;
    }
  }

  return { req, abort: () => abortController.abort() };
};


// const addComment= (id: string, comment: string) => {
//     const abortController = new AbortController()
//     const req = apiClient.put<PostData>(`post/comment/${id}`, {comment}, { signal: abortController.signal })
//     return { req, abort: () => abortController.abort() }
// }

export const addComment = async (id: string, comment: string) => {
  const abortController = new AbortController();
  const makeRequest = async () => {
    console.log("making the request");
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return await apiClient.put<PostData>(`post/comment/${id}`, {comment}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      signal: abortController.signal
    });
  };

  let req;
  try {
    req = await makeRequest();
  } catch (err) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (tokenPayload.exp && tokenPayload.exp < currentTimestamp) {
      console.error("error expiration time:" + err);
      console.error("going to refreshToken");
      await refreshToken();
      req = await makeRequest();
    } else {
      throw err;
    }
  }

  return { req, abort: () => abortController.abort() };
};


// const deletePost = (id: string) => {
//     const abortController = new AbortController()
//     const req = apiClient.delete<PostData>(`post/${id}`, { signal: abortController.signal })
//     return { req, abort: () => abortController.abort() }
// }

export const deletePost = async (id: string) => {
  const abortController = new AbortController();
  const makeRequest = async () => {
    console.log("making the request");
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return await apiClient.delete<PostData>(`post/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      signal: abortController.signal
    });
  };

  let req;
  try {
    req = await makeRequest();
  } catch (err) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (tokenPayload.exp && tokenPayload.exp < currentTimestamp) {
      console.error("error expiration time:" + err);
      console.error("going to refreshToken");
      await refreshToken();
      req = await makeRequest();
    } else {
      throw err;
    }
  }

  return { req, abort: () => abortController.abort() };
};


// const addPost = (postData: PostData) => {
//     const abortController = new AbortController()
//     const req = apiClient.post<PostData>('post', postData, { signal: abortController.signal })
//     return { req, abort: () => abortController.abort() }
// }


// export const addPost = (postData: PostData) => {
//     // const accessToken = localStorage.getItem("accessToken");
//     // if (!accessToken) {
//     //     throw new Error("No access token found");
//     // }
//     // return new Promise<PostData>((resolve, reject) => {
//     //     apiClient.post<PostData>("/post", postData).then((response) => {
//     //         resolve(response.data)
//     //     }).catch((error) => {
//     //         reject(error)
//     //     })
//     // })
//     //TODO: CHECK WHEN THE TOKEN ISN'T VALID ANYMORE
//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) {
//         throw new Error("No access token found");
//     }
//     return new Promise<PostData>((resolve, reject) => {
//         apiClient.post<PostData>("/post", postData, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         }).then((response) => {
//             resolve(response.data)
//         }).catch((error) => {
//             reject(error)
//         })
//     })
// }


export const addPost = async (postData: PostData) => {
    const abortController = new AbortController();
    const makeRequest = async () => {
      console.log("making the request");
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      return await apiClient.post<PostData>("/post", postData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        signal: abortController.signal
      });
    };
  
    let req;
    try {
      req = await makeRequest();
    } catch (err) {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (tokenPayload.exp && tokenPayload.exp < currentTimestamp) {
        console.error("error expiration time:" + err);
        console.error("going to refreshToken");
        await refreshToken();
        req = await makeRequest();
      } else {
        throw err;
      }
    }
  
    return { req, abort: () => abortController.abort() };
  };



const refreshToken = async () => {
    console.log("refreshing the Token");
    const abortController = new AbortController()
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("No refresh token found");
    }
    console.log( refreshToken);
    const res = await apiClient.get('auth/refreshToken', { 
        headers: {
            'Authorization': `Bearer ${refreshToken}`
        },
        signal: abortController.signal
     });
    const newAccessToken = res.data.accessToken; 
    const newRefreshToken = res.data.refreshToken; 
    console.log( res );
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    console.log("new access token:" + newAccessToken);
    console.log("new refresh token:" + newRefreshToken);
    console.log("refreshing sucsses");
}


export default { getPosts, editPost, addComment, deletePost , addPost, getPostByID}