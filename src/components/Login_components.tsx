
import { ChangeEvent, useRef, useState } from 'react'
import { postLogIn } from "../services/login-service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom'


export let userIDLogin: string

const LoginComponent = () => {
  const navigate = useNavigate();


  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)


  const login = async () => {  
    if (emailInputRef.current?.value && passwordInputRef.current?.value) {
      const email = emailInputRef.current?.value;
      const password = passwordInputRef.current?.value;
      const res = await postLogIn(email, password);
      userIDLogin = res._id as string; // Add type assertion here
      console.log("userIDLogin: " + userIDLogin);
      console.log(res);
      if (res.accessToken) {
        localStorage.setItem('accessToken', res.accessToken);
      }
      if (res.refreshToken) {
        localStorage.setItem('refreshToken', res.refreshToken);
      }
      navigate('/feed');
    }
   
}

const handleButtonClick = () => {
  navigate('/registration');
};
    
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

            <button onClick={handleButtonClick} className="btn btn-primary">
              Don't have a member yet? Register here
            </button>
        </div>
        )


};

export default LoginComponent;

