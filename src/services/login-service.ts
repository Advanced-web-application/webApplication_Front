// login-service.ts

interface User {
    username: string;
    password: string;
  }
  
  export const login = async (username: string, password: string): Promise<User | null> => {
    // Replace with your actual fetch or axios request to your server
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      return null;
    }
  };