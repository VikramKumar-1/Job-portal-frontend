import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './JobProject/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1> App is rendring</h1>
  </StrictMode>,
)
