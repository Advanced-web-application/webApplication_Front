// Login_component.tsx

import React, { useState } from 'react';
import { login } from "../services/login-service"
// import { userID } from './Registration';

export let userIDLogin : string;

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await login(username, password);
    
    userIDLogin = res.user._id ?? '';
      console.log(userIDLogin);
    if (res.accessToken) {
      localStorage.setItem('accessToken', res.accessToken);
  }
if (res.refreshToken) {
  localStorage.setItem('refreshToken', res.refreshToken);
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginComponent;