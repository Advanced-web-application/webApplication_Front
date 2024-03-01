import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="895634267011-cv2o910rnca99423ud3en0js0raidflh.apps.googleusercontent.com">

      <App />

  </GoogleOAuthProvider>
)










