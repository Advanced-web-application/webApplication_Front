// Login_component.tsx

import React, { useState } from 'react';
import { postLogIn } from "../services/login-service"
export let userID: string


const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await postLogIn(username, password);
    userID = res.user._id ?? '';
    console.log(res)
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