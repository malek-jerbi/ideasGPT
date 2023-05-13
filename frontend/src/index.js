import React from 'react'
import ReactDOM from 'react-dom/client'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Auth0Provider } from '@auth0/auth0-react'
import 'font-awesome/css/font-awesome.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-xl04qgs7ocqc3337.us.auth0.com'
      clientId='jd6MnN0e5yJN8rGPQDiBG1pRB9ruzXdX'
      authorizationParams={{
        redirect_uri: 'http://localhost:3000/',
        audience: 'https://dev-xl04qgs7ocqc3337.us.auth0.com/api/v2/',
        scope: 'read:current_user update:current_user_metadata',
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// how to change the favicon CODE?
// Path: frontend\public\index.html
