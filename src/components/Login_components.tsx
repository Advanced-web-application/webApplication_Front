
import { ChangeEvent, useRef, useState } from 'react'
import { postLogIn } from "../services/login-service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
export let userID: string



const LoginComponent = () => {


  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)


  const login = async () => {  
    if (emailInputRef.current?.value && passwordInputRef.current?.value) {
       const email= emailInputRef.current?.value
        const password=passwordInputRef.current?.value
        const res = await postLogIn(email, password)
        userID = res._id ?? '';
        console.log(res)
        if (res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
        }
      if (res.refreshToken) {
          localStorage.setItem('refreshToken', res.refreshToken);
      }
    }
}



    
  return (

  <div className="vstack gap-3 col-md-7 mx-auto">
            <h1>LogIn</h1>

            <div className="form-floating">
                <input ref={emailInputRef} type="text" className="form-control" id="floatingInput" placeholder="" />
                <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
                <input ref={passwordInputRef} type="password" className="form-control" id="floatingPassword" placeholder="" />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="button" className="btn btn-primary" onClick={login}>LogIn</button>
        </div>
        )


};

export default LoginComponent;

