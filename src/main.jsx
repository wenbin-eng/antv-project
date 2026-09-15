import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/style/base.css'
import './assets/style/light.css'
import './assets/style/dark.css'
import './assets/style/components/index.less'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
